const dbService = require('./bd/Conexion');

class comentariosModelo {
  static async todocomentarios(pagina = 1) {
    //pagina = 1;
    const limite = 50;  // Número máximo de productos por página
    const offset = (pagina - 1) * limite;  // Calculamos el offset para la paginación
    //const query = 'SELECT * FROM usuarios ORDER BY idProducto ASC';
    const query = `SELECT * FROM comentarios ORDER BY id_comentarios ASC LIMIT ${limite} OFFSET ${offset}`;
    try {
      return await dbService.query(query);
    } catch (err) {
      throw err;
    }
  }

  static async buscarPorId(id) {
    const query = 'SELECT * FROM comentarios WHERE id_comentarios = ?';
    try {
      const [coment] = await dbService.query(query, [id]);
      return coment || null; // ← Asegurar que devuelva `null` si no hay usuario
    } catch (err) {
      throw err;
    }
  }

  static async buscarPorResena(res) {
    const query = 'SELECT * FROM comentarios WHERE resenas LIKE ?';
    try {
      return await dbService.query(query, [`%${res}%`]);
    } catch (err) {
      throw err;
    }
  }

  static async buscarPorObserv(obs) {
    const query = 'SELECT * FROM comentarios WHERE observaciones LIKE ?';
    try {
      return await dbService.query(query, [`%${obs}%`]);
    } catch (err) {
      throw err;
    }
  }

  static async crearCom(res, obs) {
      const query = 'INSERT INTO usuarios (id_comentarios, resenas, observaciones) VALUES (?, ?, ?)';
      try {
        return await dbService.query(query, [res, obs]);
      } catch (err) {
        throw err;
      }
    }
  
    static async modificarCom(res, obs) {
      const query = 'UPDATE comentarios SET resenas = ?,  observaciones = ? WHERE id_comentarios = ?';
      try {
        return await dbService.query(query, [res, obs]);
      } catch (err) {
        throw err;
      }
    }
  
    static async eliminarCom(id) {
      const query = 'DELETE FROM comentarios WHERE id_comentarios = ?';
      try {
        return await dbService.query(query, [id]);
      } catch (err) {
        throw err;
      }
    }
}

module.exports = comentariosModelo;