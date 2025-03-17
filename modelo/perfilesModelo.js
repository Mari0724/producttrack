const dbService = require('./bd/Conexion');

class perfilesModelo {
  static async todoPerfiles(pagina = 1) {
    const limite = 50;
    const offset = (pagina - 1) * limite;
    const query = `SELECT * FROM perfiles ORDER BY idPerfil ASC LIMIT ${limite} OFFSET ${offset}`;
    try {
      return await dbService.query(query);
    } catch (err) {
      throw err;
    }
  }

  static async buscarPorId(id) {
    const query = 'SELECT * FROM perfiles WHERE idPerfil = ?';
    try {
      const [perfil] = await dbService.query(query, [id]);
      return perfil || null;
    } catch (err) {
      throw err;
    }
  }

  static async buscarPorUsuario(idUsuario) {
    const query = 'SELECT * FROM perfiles WHERE idUsuario = ?';
    try {
      const [perfil] = await dbService.query(query, [idUsuario]);
      return perfil || null;
    } catch (err) {
      throw err;
    }
  }

  static async buscarPorTelefono(telefono) {
    const query = 'SELECT * FROM perfiles WHERE telefono LIKE ?';
    try {
      return await dbService.query(query, [`%${telefono}%`]);
    } catch (err) {
      throw err;
    }
  }

  static async crearPerfil(idUsuario, nombreCompleto, telefono, direccion, fotoPerfil = null) {
    const query = 'INSERT INTO perfiles (idUsuario, nombreCompleto, telefono, direccion, fotoPerfil) VALUES (?, ?, ?, ?, ?)';
    try {
      return await dbService.query(query, [idUsuario, nombreCompleto, telefono, direccion, fotoPerfil]);
    } catch (err) {
      throw err;
    }
  }

  static async modificarPerfil(idUsuario, nombreCompleto, telefono, direccion, fotoPerfil = null) {
    const query = 'UPDATE perfiles SET nombreCompleto = ?, telefono = ?, direccion = ?, fotoPerfil = ? WHERE idUsuario = ?';
    try {
      return await dbService.query(query, [nombreCompleto, telefono, direccion, fotoPerfil, idUsuario]);
    } catch (err) {
      throw err;
    }
  }

  static async eliminarPerfil(idPerfil) {
    const query = 'DELETE FROM perfiles WHERE idPerfil = ?';
    try {
      return await dbService.query(query, [idPerfil]);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = perfilesModelo;
