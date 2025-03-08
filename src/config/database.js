import 'dotenv/config';

module.exports = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // Exige SSL
        rejectUnauthorized: false // Permite certificados autoassinados
      }
    },
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    }
}



// Definir a URL base do backend
process.env.APP_URL = "https://devburguer-api.onrender.com";