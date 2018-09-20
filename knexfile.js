// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql:///stockmoji'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
