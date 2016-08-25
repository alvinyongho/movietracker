'use strict';
module.exports = function(sequelize, DataTypes) {
  var Movie = sequelize.define('Movie', {
    movie_title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Movie;
};