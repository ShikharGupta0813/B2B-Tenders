module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '2004',
      database: 'b2b_tenders',
    },
    migrations: {
      directory: './migrations',
    },
  },
};
