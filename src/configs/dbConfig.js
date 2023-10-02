export default {
  HOST: "localhost",
  USER: "shobhitsrivastava",
  PASSWORD: "password",
  DB: "postgres",
  dialect: "postgres",
  logging: false,
  port: 5433,
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 1,
    min: 0,
    acquire: 0,
    idle: 0,
  },
};
