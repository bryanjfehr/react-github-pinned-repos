/**
 * Fetches pinned repositories for a given GitHub username using GitHub's public GraphQL API
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} Array of pinned repository objects
 */
export const fetchPinnedRepos = async (username) => {
    const query = `
      query ($username: String!) {
        user(login: $username) {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                primaryLanguage {
                  name
                  color
                }
                stargazers {
                  totalCount
                }
              }
            }
          }
        }
      }
    `;
  
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Using a public endpoint, no auth token needed for pinned repos
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });
  
    const { data } = await response.json();
    if (!data?.user?.pinnedItems?.nodes) {
      throw new Error('No pinned repositories found');
    }
  
    return data.user.pinnedItems.nodes.map((node) => ({
      repo: node.name,
      description: node.description || 'No description',
      url: node.url,
      language: node.primaryLanguage?.name || 'Unknown',
      languageColor: node.primaryLanguage?.color || '#ccc',
      stars: node.stargazers.totalCount,
    }));
  };
  