import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchPinnedRepos } from './lib/fetchPinnedRepos';
import PinnedRepoCard from './components/PinnedRepoCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles/PinnedRepos.module.css'; // Import CSS module

const GitHubPinnedRepos = ({ username, maxRepos = 6 }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        setLoading(true);
        const pinnedRepos = await fetchPinnedRepos(username);
        setRepos(pinnedRepos.slice(0, maxRepos));
      } catch (err) {
        setError('Failed to fetch pinned repositories');
      } finally {
        setLoading(false);
      }
    };

    if (username) loadRepos();
  }, [username, maxRepos]);

  if (loading) return <div className={`${styles.loading} text-center`}>Loading...</div>;
  if (error) return <div className={`${styles.error} text-center`}>{error}</div>;

  return (
    <div className={`${styles.container} container`}>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {repos.map((repo) => (
          <div key={repo.repo} className="col">
            <PinnedRepoCard repo={repo} />
          </div>
        ))}
      </div>
    </div>
  );
};

GitHubPinnedRepos.propTypes = {
  username: PropTypes.string.isRequired,
  maxRepos: PropTypes.number,
};

export default GitHubPinnedRepos;
