module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/g32jwtapp',
    pool: {
      min: 1,
      max: 1
    }
  }
};
