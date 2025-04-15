# Examples for react-github-pinned-repos

Here are some examples to help you get started with `react-github-pinned-repos`.

## Basic Usage
Display pinned repositories for a GitHub user with the default maximum of 6 repos.

```jsx
import React from 'react';
import GitHubPinnedRepos from 'react-github-pinned-repos';

function App() {
  return (
    <div>
      <h1>My Pinned Repos</h1>
      <GitHubPinnedRepos username="octocat" />
    </div>
  );
}

export default App;