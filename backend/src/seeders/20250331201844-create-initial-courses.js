'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Courses', [
      {
        name: 'Ciência da Computação',
        description: 'Curso voltado para desenvolvimento de software',
        duration: '4 anos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Engenharia Elétrica',
        description: 'Curso voltado para eletrônica e sistemas elétricos',
        duration: '5 anos',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Courses', null, {});
  }
};
