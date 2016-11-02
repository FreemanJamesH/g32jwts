module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/jwtapp',
    pool: {
      min: 1,
      max: 1
    }
  }
};
