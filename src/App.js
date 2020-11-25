import React, { useState, useEffect } from 'react';

import "./styles.css";
import api from './services/api';

function App() {

  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    });
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Repository 01',
      url: 'https://www.repositories.com',
      techs: ['NodeJs', 'ReactJS']
    })

    const repository = response.data;

    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepository(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remove
        </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Add</button>
    </div>
  );
}

export default App;

