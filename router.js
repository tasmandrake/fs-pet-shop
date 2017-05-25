const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());

router.get('/:id', (req, res) => {
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

router.get('/', (req, res) => {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    res.header('Content-Type', 'application/json');
    res.send(data);
  });
});

router.post('/', (req, res) => {
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
      res.send('Bad Request');
    }
  });
});

router.patch('/:id', (req, res) => {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const id = req.params.id;
    const pets = JSON.parse(data);
    const updatePet = req.body;
    if (Number.isInteger(updatePet.age) || updatePet.kind || updatePet.name) {
      const oldPet = pets[id];
      const newPet = {
        age: updatePet.age || oldPet.age,
        kind: updatePet.kind || oldPet.kind,
        name: updatePet.name || oldPet.name,
      };
      pets[id] = newPet;
      const petsJson = JSON.stringify(pets);
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
      res.send('Bad Request');
    }
  });
});

router.delete('/:id', (req, res) => {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const id = req.params.id;
    const pets = JSON.parse(data);
    const deletedPet = pets[id];
    pets.splice(id, 1);
    const petsJSON = JSON.stringify(pets);
    fs.writeFile('pets.json', petsJSON, (error) => {
      if (error) {
        throw error;
      }
      res.header('Content-Type', 'application/json');
      res.send(deletedPet);
    });
  });
});


module.exports = router;
