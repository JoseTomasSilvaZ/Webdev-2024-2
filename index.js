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

app.get('/pokemons/:name', async(req, res) => {
  const pokemonName = req.params.name;

  try {

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    const data = await response.json();
    if(!data){
      return res.status(404).json({
        ok: false,
        message: 'Pokemon not found',
      });
    }
    
    return res.json({
      ok: true,
      pokemon:data,
    });
  } catch(error){
    return res.status(500).json({
      ok: false,
      message: 'Something went wrong fetching the pokemon data. Maybe the pokemon does not exist.',
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
