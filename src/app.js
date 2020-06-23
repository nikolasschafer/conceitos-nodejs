const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return repositories;
});

app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;

  const repositorie = { 
    id: uuid(),
    title,
    url,
    techs,
    likes: 0 
  }

  repositories.push(repositorie);

  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs} = request.params;
  const { id } = request.params

  const repositorieIndex = repositories.findIndex((repositorie) => (repositorie.id === id));
 
  if(repositorieIndex < 0){
    return response.status(400).json({error: "Repositorie not found!"});
  }

  const likes = repositories[repositorieIndex].like;

  repositories[repositorieIndex] = {
    id,
    title,
    url,
    techs,
    likes,
  }

  return response.json(repositories[repositorieIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
