const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.get('/pets/:id', (req, res) => {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const id = req.params.id;
    const pets = JSON.parse(data);
    const pet = JSON.stringify(pets[id]);
    if (pet) {
      res.header('Content-Type', 'application/json');
      res.send(pet);
    } else {
      res.header('Content-Type', 'text/plain');
      res.status(404);
      res.send('Not Found');
    }
  });
});

app.get('/pets', (req, res) => {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    res.header('Content-Type', 'application/json');
    res.send(data);
  });
});

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

app.post('/pets', (req, res) => {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const pets = JSON.parse(data);
    const newPet = req.body;
    pets.push(newPet);
    const petsJson = JSON.stringify(pets);
    if (newPet.age && newPet.kind && newPet.name) {
      fs.writeFile('pets.json', petsJson, (error) => {
        if (error) {
          throw error;
        }
        res.header('Content-Type', 'application/json');
        res.send(newPet);
      });
    } else {
      res.header('Content-Type', 'text/plain');
      res.status(400);
      res.send('Invalid Data');
    }
  });
});

app.use((req, res) => {
  res.header('Content-Type', 'text/plain');
  res.status(404).send('Not Found');
});

app.use((err, req ,res) => {
  console.error(err.stack);
  res.header('Content-Type', 'text/plain');
  res.status(500).send('Internal Server Error');
});

app.listen(8000);

module.exports = app;
