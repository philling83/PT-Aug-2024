const express = require("express");
const router = express.Router();

const { Pokemon } = require("../../db/models");

router.get("/:pokemonId", async (req, res) => {
  const { pokemonId } = req.params;

  const pokemon = await Pokemon.findByPk(pokemonId);

  return res.json({
    Pokemon: pokemon
  });
});

router.get("/", async (req, res) => {
  const pokemons = await Pokemon.findAll();

  return res.json({
    Pokemons: pokemons
  });
});

router.post("/", async (req, res) => {
  const { name, type, pokeballId } = req.body;

  const newPokemon = await Pokemon.create({
    name,
    type,
    pokeballId
  });

  return res.json(newPokemon);
});

module.exports = router;