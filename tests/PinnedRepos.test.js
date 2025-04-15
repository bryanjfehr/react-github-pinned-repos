import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import GitHubPinnedRepos from '../src/index';
import { fetchPinnedRepos } from '../src/lib/fetchPinnedRepos';

// Mock the fetchPinnedRepos function
jest.mock('../src/lib/fetchPinnedRepos');

describe('GitHubPinnedRepos', () => {
  const mockRepos = [
    {
      repo: 'test-repo',
      description: 'A test repo',
      url: 'https://github.com/test/test-repo',
      language: 'JavaScript',
      languageColor: '#f1e05a',
      stars: 42,
    },
  ];

  beforeEach(() => {
    fetchPinnedRepos.mockClear();
  });

  test('renders loading state initially', () => {
    fetchPinnedRepos.mockResolvedValueOnce(new Promise(() => {})); // Never resolves
    render(<GitHubPinnedRepos username="testuser" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state on fetch failure', async () => {
    fetchPinnedRepos.mockRejectedValueOnce(new Error('Fetch error'));
    render(<GitHubPinnedRepos username="testuser" />);
    await waitFor(() =>
      expect(screen.getByText('Failed to fetch pinned repositories')).toBeInTheDocument()
    );
  });

  test('renders pinned repos successfully', async () => {
    fetchPinnedRepos.mockResolvedValueOnce(mockRepos);
    render(<GitHubPinnedRepos username="testuser" />);
    await waitFor(() => {
      expect(screen.getByText('test-repo')).toBeInTheDocument();
      expect(screen.getByText('A test repo')).toBeInTheDocument();
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('⭐ 42')).toBeInTheDocument();
    });
  });

  test('limits repos to maxRepos prop', async () => {
    const moreRepos = [...mockRepos, { repo: 'extra', description: 'Extra', url: 'https://example.com', stars: 0 }];
    fetchPinnedRepos.mockResolvedValueOnce(moreRepos);
    render(<GitHubPinnedRepos username="testuser" maxRepos={1} />);
    await waitFor(() => {
      expect(screen.getByText('test-repo')).toBeInTheDocument();
      expect(screen.queryByText('extra')).not.toBeInTheDocument();
    });
  });
});