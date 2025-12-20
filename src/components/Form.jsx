import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function Form() {
  const [query, setQuery] = useState("");
  const [repositories, setRepositories] = useState([]);

  const getRepositories = async (q) => {
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=${q}`
    );
    const data = await response.data;
    return (data.items || []);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await getRepositories("react")
      setRepositories(data)
    }
    fetchInitialData()
  }, []);

  const submitForm = async (e) => {
    e.preventDefault()
    const rep = await getRepositories(query)
    setRepositories(rep)
  }

  return (
    <div className="main-wrapper">
      <div className="search-area">
        <form onSubmit={submitForm}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter search term..."
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="results-wrapper">
        <div className="results-container">
          {repositories.map((repo) => (
            <div key={repo.id} className="repo-card">
              <img
                src={repo.owner.avatar_url}
                alt={repo.owner.login}
                className="avatar"
              />

              <div className="repo-info">
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  {repo.full_name}
                </a>

                <div className="repo-meta">
                  <span>⭐ {repo.stargazers_count}</span>
                  <span>🍴 {repo.forks_count}</span>
                  {repo.language && <span>💻 {repo.language}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Form;