import 'dotenv/config';

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'postgres',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    }
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    }
  }
};


// Definir a URL base do backend
process.env.APP_URL = "https://devburguer-api.onrender.com";