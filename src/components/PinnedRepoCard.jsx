import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/PinnedRepos.module.css'; // Import CSS module

const PinnedRepoCard = ({ repo }) => (
  <div className="card h-100 shadow-sm">
    <div className="card-body">
      <h5 className="card-title">
        <a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-primary">
          {repo.repo}
        </a>
      </h5>
      <p className="card-text text-muted">{repo.description}</p>
    </div>
    <div className="card-footer bg-white border-0">
      <small className="d-flex justify-content-between">
        <span>
          <span
            className={styles.languageDot}
            style={{ backgroundColor: repo.languageColor }}
          />
          {repo.language}
        </span>
        <span>⭐ {repo.stars}</span>
      </small>
    </div>
  </div>
);

PinnedRepoCard.propTypes = {
  repo: PropTypes.shape({
    repo: PropTypes.string.isRequired,
    description: PropTypes.string,
    url: PropTypes.string.isRequired,
    language: PropTypes.string,
    languageColor: PropTypes.string,
    stars: PropTypes.number,
  }).isRequired,
};

export default PinnedRepoCard;
