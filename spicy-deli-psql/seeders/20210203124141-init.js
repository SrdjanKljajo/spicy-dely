'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'category',
      [
        {
          id: 1,
          category_name: 'Ethiopia',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          category_name: 'Beef',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          category_name: 'Meat',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          category_name: 'Chili pepper',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          category_name: 'China',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          category_name: 'Fish',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7,
          category_name: 'Tofu',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 8,
          category_name: 'Sichuan pepper',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9,
          category_name: 'Peru',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 10,
          category_name: 'Potato',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 11,
          category_name: 'Yellow Chili pepper',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
    await queryInterface.bulkInsert(
      'product',
      [
        {
          id: 1,
          name: 'Sik Sik Wat',
          category_id: 5,
          sku: 'DISH999ABCD',
          price: 13.49,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Huo Guo',
          category_id: 1,
          sku: 'DISH234ZFDR',
          price: 11.99,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'Cau-Cau',
          category_id: 6,
          sku: 'DISH775TGHY',
          price: 15.29,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('channel', null, bulkDeleteOptions)
    await queryInterface.bulkDelete('user', null, bulkDeleteOptions)
    await queryInterface.bulkDelete('category', null, bulkDeleteOptions)
    await queryInterface.bulkDelete('product', null, bulkDeleteOptions)
  },
}
