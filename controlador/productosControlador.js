const productosModelo = require('../modelo/productosModelo');

class productosControlador {
  static async obtenerTodosLosProductos(req, res) {
    try {
      const productos = await productosModelo.todosLosProductos();
      res.json(productos);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener los productos' });
    }
  }

  static async buscarProductoPorId(req, res) {
    const { id } = req.params;
    try {
      const producto = await productosModelo.buscarPorId(id);
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(producto);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el producto' });
    }
  }

  static async buscarProductoPorNombre(req, res) {
    const { nombre } = req.params;
    try {
      const productos = await productosModelo.buscarPorNombre(nombre);
      res.json(productos);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el producto' });
    }
  }

  static async buscarProductoPorCategoria(req, res) {
    const { categoria } = req.params;
    try {
      const productos = await productosModelo.buscarPorCategoria(categoria);
      res.json(productos);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el producto' });
    }
  }

  static async buscarProductoPorCodigoBarras(req, res) {
    const { codigoBarras } = req.params;
    try {
      const producto = await productosModelo.buscarPorCodigoBarras(codigoBarras);
      res.json(producto);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el producto' });
    }
  }

  static async buscarProductoPorDescripcion(req, res) {
    const { descripcion } = req.params;
    try {
      const productos = await productosModelo.buscarPorDescripcion(descripcion);
      res.json(productos);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el producto' });
    }
  }

  static async buscarProductoPorFechaAdquisicion(req, res) {
    const { fechaAdquisicion } = req.params;
    try {
      const productos = await productosModelo.buscarPorFechaAdquisicion(fechaAdquisicion);
      res.json(productos);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el producto' });
    }
  }

  static async crearProducto(req, res) {
    const { nombre, descripcion, precio, stock, categoria, codigoBarras, fechaAdquisicion } = req.body;
    try {
      const result = await productosModelo.crearProducto(nombre, descripcion, precio, stock, categoria, codigoBarras, fechaAdquisicion);
      res.status(201).json({ message: 'Producto creado', idProducto: result.insertId });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al crear el producto' });
    }
  }

  static async editarProducto(req, res) {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, categoria, codigoBarras, fechaAdquisicion } = req.body;
    try {
      const result = await productosModelo.modificarProducto(id, nombre, descripcion, precio, stock, categoria, codigoBarras, fechaAdquisicion);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json({ message: 'Producto actualizado' });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al actualizar el producto' });
    }
  }

  static async borrarProducto(req, res) {
    const { id } = req.params;
    try {
      const result = await productosModelo.eliminarProducto(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json({ message: 'Producto eliminado' });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al eliminar el producto' });
    }
  }
}

module.exports = productosControlador;
