const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
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
  const { title, url, techs } = request.body;
  const { id } = request.params;

  if(!isUuid(id)){
    return response.status(400).json({error: "Repositorie invalid ID!"});
  }

  const repositorieIndex = repositories.findIndex((repositorie) => (repositorie.id === id));
 
  if(repositorieIndex < 0){
    return response.status(400).json({error: "Repositorie not found!"});
  }

  repositories[repositorieIndex] = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositorieIndex].likes
  }

  return response.status(200).json(repositories[repositorieIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  if(!isUuid(id)){
    return response.status(400).json({error: "Repositorie invalid ID!"});
  }

  const repositorieIndex = repositories.findIndex((repositorie) => (repositorie.id === id));
 
  if(repositorieIndex < 0){
    return response.status(400).json({error: "Repositorie not found!"});
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repositorieIndex = repositories.findIndex((repositorie) => (repositorie.id === id));
 
  if(repositorieIndex < 0){
    return response.status(400).json({error: "Repositorie not found!"});
  }

  const likes = repositories[repositorieIndex].likes + 1

  repositories[repositorieIndex].likes = likes; 

  console.log(likes);

  return response.status(200).json({likes});
});

module.exports = app;
