import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [repositories, setRepositories] = useState([]);

  const getRepositories = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}`
    );
    const data = await response.json();
    setRepositories(data.items || []);
  };

  return (
    <div className="main-wrapper">
      <div className="header-section">
        <h1>Forms</h1>
      </div>

      <div className="search-area">
        <form onSubmit={getRepositories}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter search term..."
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="results-container">
        {repositories.map((repo) => (
          <div key={repo.id} className="repo-card">
            <img
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
              className="avatar"
            />
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="repo-link"
            >
              {repo.full_name}
            </a>
            <p className="repo-desc">
              {repo.description || "No description available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;