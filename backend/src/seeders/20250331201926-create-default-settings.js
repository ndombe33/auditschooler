'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Settings', [
      {
        key: 'currentYear',
        value: '2025',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'enrollmentOpen',
        value: 'true',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Settings', null, {});
  }
};
