#!/usr/bin/env node
// $ chmod +x pets.js


const fs = require('fs');

const cmd = process.argv[2];
const index = process.argv[3];

if (!cmd) {
  console.error('Usage: node pets.js [read | create | update | destroy]');
  process.exit(1);
} else if (cmd === 'read') {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    if (index) {
      if (JSON.parse(data)[index]) {
        const pets = JSON.parse(data)[index];
        console.log(pets);
      } else {
        console.error('Usage: node pets.js read INDEX');
        process.exit(1);
      }
    } else {
      const pets = JSON.parse(data);
      console.log(pets);
    }
  });
} else if (cmd === 'create') {
  if (!process.argv[5]) {
    console.error('Usage: node pets.js create AGE KIND NAME');
    process.exit(1);
  }
  fs.readFile('./pets.json', 'utf8', (readError, data) => {
    if (readError) {
      throw readError;
    }
    const pets = JSON.parse(data);
    const newPet = {
      age: Number(process.argv[3]),
      kind: process.argv[4],
      name: process.argv[5],
    };
    pets.push(newPet);
    const petsJson = JSON.stringify(pets);
    fs.writeFile('./pets.json', petsJson, (writeError) => {
      if (writeError) {
        throw writeError;
      }
      console.log(newPet);
    });
  });
} else if (cmd === 'update') {
  if (!process.argv[6]) {
    console.error('Usage: node pets.js update INDEX AGE KIND NAME');
    process.exit(1);
  }
  fs.readFile('./pets.json', 'utf8', (readError, data) => {
    if (readError) {
      throw readError;
    }
    const pets = JSON.parse(data);
    const updatePet = {
      age: Number(process.argv[4]),
      kind: process.argv[5],
      name: process.argv[6],
    };
    pets[process.argv[3]] = updatePet;
    const petsJson = JSON.stringify(pets);
    fs.writeFile('./pets.json', petsJson, (writeError) => {
      if (writeError) {
        throw writeError;
      }
      console.log(updatePet);
    });
  });
} else if (cmd === 'destroy') {
  if (!process.argv[3]) {
    console.error('Usage: node pets.js destroy INDEX');
    process.exit(1);
  }
  fs.readFile('./pets.json', 'utf8', (readError, data) => {
    if (readError) {
      throw readError;
    }
    const i = process.argv[3];
    const pets = JSON.parse(data);
    const deletedPet = pets[i];
    pets.splice(i, 1);
    const petsJson = JSON.stringify(pets);
    fs.writeFile('./pets.json', petsJson, (writeError) => {
      if (writeError) {
        throw writeError;
      }
      console.log(deletedPet);
    });
  });
}
