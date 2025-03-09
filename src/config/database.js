require('dotenv/config');

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  ssl: process.env.DATABASE_SSL === `true`,
  dialect: process.env.DB_DIALECT || 'postgres',
  dialectOptions: process.env.DB_SSL === "true" ? { ssl: { require: true, rejectUnauthorized: false } } : {},
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    }
  }

};


// Definir a URL base do backend
process.env.APP_URL = "https://devburguer-api.onrender.com";