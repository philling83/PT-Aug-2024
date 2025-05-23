'use strict';

const { Pokemon, Pokeball } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    // ********************Dynamic Seedings**************************** //
    const masterball = await Pokeball.findOne({
      where: {
        name: "Masterball"
      }
    });

    // ********************Using queryInterface************************ //
    // await queryInterface.bulkInsert("Pokemons", [
    //   {
    //     name: "Blastoise",
    //     type: "Water",
    //     pokeballId: masterball.id
    //   },
    //   {
    //     name: "Mewtwo",
    //     type: "Psychic",
    //     pokeballId: masterball.id
    //   }
    // ])

    // ********************Using Models******************************** //
    await Pokemon.bulkCreate([
      {
        name: "Blast",
        type: "Water",
        pokeballId: masterball.id
      },
      {
        name: "Mewtwo",
        type: "Psychic",
        pokeballId: masterball.id
      }
    ], { validate: true })
  },

  // **********************Using Sequelize special methods************* //
  // await masterball.createPokemon(
  //   {
  //     name: "Blastoise",
  //     type: "Water",
  //   },
  // )
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
