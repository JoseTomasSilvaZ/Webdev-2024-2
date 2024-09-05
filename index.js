const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

const pokemons = ['Pikachu', 'Ditto', 'Bulbasaur', 'Zubat'];

app.get('/ejemplo', (req, res) => {
  return res.json({
    ok: true,
    message: 'Holaaa',
  });
});

app.get('/pokemons/:name', (req, res) => {
  const pokemonName = req.params.name;

  const pokemon = pokemons.find(
    (pokemon) => pokemon.toLowerCase() === pokemonName.toLowerCase()
  );
  if (!pokemon) {
    return res.json({
      message: 'Pokemon not found',
      input: pokemonName,
    });
  }

  return res.json({
    pokemon: pokemon,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
