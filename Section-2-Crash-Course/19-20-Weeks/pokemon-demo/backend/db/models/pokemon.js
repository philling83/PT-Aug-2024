'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pokemon.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 7],
          msg: "Out of range"
        }
      }
    },
    type: DataTypes.STRING,
    pokeballId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Pokeballs",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Pokemon',
  });
  return Pokemon;
};