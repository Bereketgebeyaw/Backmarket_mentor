export default {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5433, // Make sure you add this if your port is 5433
      user: 'postgres', // Your PostgreSQL username
      password: 'bereket', // Your PostgreSQL password
      database: 'backmarket' // The name of your PostgreSQL database
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL, // For production environments
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};