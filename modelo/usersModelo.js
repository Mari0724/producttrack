const dbService = require('./bd/Conexion');

class usersModelo{
  static async todoUsers(pagina = 1) {
    //pagina = 1;
    const limite = 50;  // Número máximo de productos por página
    const offset = (pagina - 1) * limite;  // Calculamos el offset para la paginación
    //const query = 'SELECT * FROM producto ORDER BY idProducto ASC';
    const query = `SELECT * FROM users ORDER BY idUsuario ASC LIMIT ${limite} OFFSET ${offset}`;
    try {
      return await dbService.query(query);
    } catch (err) {
      throw err;
    }
  }

  static async buscarPorId(id) {
    const query = 'SELECT * FROM users WHERE idUsuario = ?';
    try {
      const [user] = await dbService.query(query, [id]);
      return user || null; // ← Asegurar que devuelva `null` si no hay producto
    } catch (err) {
      throw err;
    }
  }

  static async buscarPorUsNam(usename) {
    const query = 'SELECT * FROM users WHERE username LIKE ?';
    try {
      return await dbService.query(query, [`%${usename}%`]);
    } catch (err) {
      throw err;
    }
  }

  static async buscarPorNomEmp(namEmp) {
    const query = 'SELECT * FROM users WHERE nombreEmpresa LIKE ?';
    try {
      return await dbService.query(query, [`%${namEmp}%`]);
    } catch (err) {
      throw err;
    }
  }

  static async buscarPorNIT(nit) {
    const query = 'SELECT * FROM users WHERE nit LIKE ?';
    try {
        return await dbService.query(query, [`%${nit}%`]);
    } catch (err) {
        throw err;
    }
}

  static async buscarPorCorreo(email) {
    const query = 'SELECT * FROM users WHERE correo LIKE ?';
    try {
      return await dbService.query(query, [`%${email}%`]);
    } catch (err) {
      throw err;
    }
  }

  static async buscarPorRol(r) {
    const query = 'SELECT * FROM users WHERE rol LIKE ?';
    try {
      return await dbService.query(query, [`%${r}%`]);
    } catch (err) {
      throw err;
    }
  }


  static async crearUsuarios(usename, email, contra, namEmp, nit) {
    const query = 'INSERT INTO users (idUsuario, username, correo, password, nombreEmpresa, nit, rol, estado, createdAt, updatedAt, delatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,)';
    try {
      return await dbService.query(query, [usename, namEmp, email, contra, nit, "usuario", "Activo"]);
    } catch (err) {
      throw err;
    }
  }

  static async modificarUsuario(usename, email, contra, namEmp, nit) {
    const query = 'UPDATE users SET username = ?, correo = ?, password = ?, nombreEmpresa = ?, nit = ? WHERE idUsuario = ?';
    try {
      return await dbService.query(query, [usename, namEmp, email, contra, nit, "usuario", "Activo"]);
    } catch (err) {
      throw err;
    }
  }

  static async eliminarUsuario(id) {
    const query = 'DELETE FROM users WHERE idUsuario = ?';
    try {
      return await dbService.query(query, [id]);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = usersModelo;