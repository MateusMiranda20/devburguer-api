'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.renameColumn('products', 'updates_at', 'updated_at');
  },

  async down (queryInterface) {
    await queryInterface.renameColumn('products', 'updated_at', 'updates_at');
  }
};
