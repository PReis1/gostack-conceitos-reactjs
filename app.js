const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const { title } = request.query;

  const result = title
  ? repositories.filter(project => repository.title.includes(title))
  : repositories;

  //console.log("Repository listed");
  return response.json(result);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);
  //console.log("Repository created");
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if (repositoryIndex < 0){
    return response.status(400).json({ error: 'Repository not found.' });
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes,
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if (repositoryIndex < 0 ){
    return response.status(400).send({ error: 'Repository not found. 🤔'});
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send("Repository deleted! 👍🏾");
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if (repositoryIndex < 0 ){
    return response.status(400).send({ error: 'Repository not found. 🤔'});
  }
  
  repositories[repositoryIndex].likes++;

  return response.json(repositories[repositoryIndex]);
  
});

module.exports = app;
