const express = require("express");
const router = express.Router();

const pokemonRouter = require("./pokemon.js");

router.use("/pokemons", pokemonRouter);

module.exports = router;