

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('users', 'verify_token', {
      type: Sequelize.STRING,
      defaultValue: null,
    }),
    queryInterface.addColumn('users', 'is_verified', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    }),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('users', 'verify_token'),
    queryInterface.removeColumn('users', 'is_verified'),
  ]),
};
