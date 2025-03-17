const mysql = require('mysql2');
const dbConfig = require('./config');


class Conexion {
    constructor() {
    this.pool = mysql.createPool(dbConfig);

    this.pool.getConnection((err, connection) => {
        if (err) {
            console.error('❌ Error al conectar a la base de datos:', err.message);
        } else {
            console.log('✅ Conectado a la base de datos');
            connection.release();
        }
    });
    }

    query(queryString, params) {
        return new Promise((resolve, reject) => {
            this.pool.query(queryString, params, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}

module.exports = new Conexion();