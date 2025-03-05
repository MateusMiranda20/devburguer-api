export default {
    dialect: process.env.DB_DIALECT || "postgres", // Adicione um valor padrão para evitar erros
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
