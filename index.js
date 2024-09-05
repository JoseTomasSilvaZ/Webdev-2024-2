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
  // Get the pokemon name from the URL
  const pokemonName = req.params.name;

  //Try to fetch the pokemon data from the API
  try {

    // Fetch the pokemon data from the API
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

    // Parse the response as JSON
    const data = await response.json();

    // If the pokemon does not exist, return a 404 status code
    if(!data){
      return res.status(404).json({
        ok: false,
        message: 'Pokemon not found',
      });
    }
    
    // If everything went well, return the pokemon data
    return res.json({
      ok: true,
      pokemon:data,
    });
  // If something went wrong, and an error is thrown, return a 500 status code
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
