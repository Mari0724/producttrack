const dbService = require('./bd/Conexion');

class productosModelo {
  static async todosLosProductos(pagina = 1) {
    const limite = 50;  // Número máximo de productos por página
    const offset = (pagina - 1) * limite;  // Calculamos el offset para la paginación
    const query = `SELECT * FROM productos ORDER BY idProducto ASC LIMIT ? OFFSET ?`;

    try {
      return await dbService.query(query, [limite, offset]);
    } catch (err) {
      throw err;
    }
  }

  static async buscarPorId(id) {
    const query = 'SELECT * FROM productos WHERE idProducto = ?';
    try {
      const [producto] = await dbService.query(query, [id]);
      return producto || null; 
    } catch (err) {
      throw err;
    }
  }

  static async buscarPorNombre(nombre) {
    const query = 'SELECT * FROM productos WHERE nombre LIKE ?';
    try {
      return await dbService.query(query, [`%${nombre}%`]);
    } catch (err) {
      throw err;
    }
  }

  static async buscarPorCategoria(categoria) {
    const query = 'SELECT * FROM productos WHERE categoria LIKE ?';
    try {
      return await dbService.query(query, [`%${categoria}%`]);
    } catch (err) {
      throw err;
    }
  }

  static async buscarPorCodigoBarras(codigoBarras) {
    const query = 'SELECT * FROM productos WHERE codigoBarras = ?';
    try {
      return await dbService.query(query, [codigoBarras]);
    } catch (err) {
      throw err;
    }
  }

  static async buscarPorDescripcion(descripcion) {
    const query = 'SELECT * FROM productos WHERE descripcion LIKE ?';
    try {
      return await dbService.query(query, [`%${descripcion}%`]);
    } catch (err) {
      throw err;
    }
  }

  static async buscarPorFechaAdquisicion(fechaAdquisicion) {
    const query = 'SELECT * FROM productos WHERE fechaAdquisicion = ?';
    try {
      return await dbService.query(query, [fechaAdquisicion]);
    } catch (err) {
      throw err;
    }
  }

  static async crearProducto(nombre, descripcion, precio, stock, categoria) {
    const query = 'INSERT INTO productos (nombre, descripcion, precio, stock, categoria) VALUES (?, ?, ?, ?, ?)';
    try {
      return await dbService.query(query, [nombre, descripcion, precio, stock, categoria]);
    } catch (err) {
      throw err;
    }
  }

  static async modificarProducto(id, nombre, descripcion, precio, stock, categoria) {
    const query = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria = ? WHERE idProducto = ?';
    try {
      return await dbService.query(query, [nombre, descripcion, precio, stock, categoria, id]);
    } catch (err) {
      throw err;
    }
  }

  static async eliminarProducto(id) {
    const query = 'DELETE FROM productos WHERE idProducto = ?';
    try {
      return await dbService.query(query, [id]);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = productosModelo;