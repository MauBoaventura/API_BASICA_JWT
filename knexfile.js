// Update with your config settings.
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host:  process.env.DB_HOST || 'localhost',
      user:  process.env.DB_USER || 'root',
      password:  process.env.DB_PASS || 'password',
      database:  process.env.DB_NAME || 'adrenalina',
      timezone: 'utc'
    },
    migrations: {
      directory: './src/database/migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'heroku_4458bb5fsfdfgfdd838ce78',
      host: 'us-cdbr-east-02.cleardb.co12312m',
      user: '',
      password: '',
      timezone: 'utc'

    },
    migrations: {
      directory: './src/database/migrations'
    }
  },
};
