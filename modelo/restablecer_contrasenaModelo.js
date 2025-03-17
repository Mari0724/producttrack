const dbService = require('./bd/Conexion');

class RestablecerModelo {
    static async todoRestablecer(pagina = 1) {
        const limite = 50;
        const offset = (pagina - 1) * limite;
        const query = `SELECT * FROM restablecer_contrasena ORDER BY idRestablecer ASC LIMIT ${limite} OFFSET ${offset}`;
        try {
            return await dbService.query(query);
        } catch (err) {
            throw err;
        }
    }

    static async buscarPorId(id) {
        const query = 'SELECT * FROM restablecer_contrasena WHERE idRestablecer = ?';
        try {
            const [registro] = await dbService.query(query, [id]);
            return registro || null;
        } catch (err) {
            throw err;
        }
    }

    static async buscarPorToken(token) {
        const query = 'SELECT * FROM restablecer_contrasena WHERE token = ?';
        try {
            const [registro] = await dbService.query(query, [token]);
            return registro || null;
        } catch (err) {
            throw err;
        }
    }

    static async crearRegistro(idUsuario, token, fechaExpiracion) {
        const query = 'INSERT INTO restablecer_contrasena (idUsuario, token, fechaSolicitud, fechaExpiracion, usado) VALUES (?, ?, CURRENT_TIMESTAMP, ?, 0)';
        try {
            return await dbService.query(query, [idUsuario, token, fechaExpiracion]);
        } catch (err) {
            throw err;
        }
    }

    static async marcarComoUsado(idRestablecer) {
        const query = 'UPDATE restablecer_contrasena SET usado = 1 WHERE idRestablecer = ?';
        try {
            return await dbService.query(query, [idRestablecer]);
        } catch (err) {
            throw err;
        }
    }

    static async eliminarRegistro(idRestablecer) {
        const query = 'DELETE FROM restablecer_contrasena WHERE idRestablecer = ?';
        try {
            return await dbService.query(query, [idRestablecer]);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = RestablecerModelo;