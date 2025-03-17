const RestablecerModelo = require('../modelo/restablecerModelo');

class RestablecerControlador {
  static async obtenerTodos(req, res) {
    try {
      const registros = await RestablecerModelo.obtenerTodos();
      res.json(registros);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener los registros' });
    }
  }

  static async buscarPorIdUsuario(req, res) {
    const { idUsuario } = req.params;
    try {
      const registro = await RestablecerModelo.buscarPorIdUsuario(idUsuario);
      if (!registro) {
        return res.status(404).json({ error: 'Registro no encontrado' });
      }
      res.json(registro);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el registro' });
    }
  }

  static async buscarPorToken(req, res) {
    const { token } = req.params;
    try {
      const registro = await RestablecerModelo.buscarPorToken(token);
      if (!registro) {
        return res.status(404).json({ error: 'Token no encontrado' });
      }
      res.json(registro);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el token' });
    }
  }

  static async crearRegistro(req, res) {
    const { idUsuario, token, fechaExpiracion } = req.body;
    try {
      const result = await RestablecerModelo.crearRegistro(idUsuario, token, fechaExpiracion);
      res.status(201).json({ message: 'Registro creado', idRestablecer: result.insertId });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al crear el registro' });
    }
  }

  static async actualizarRegistro(req, res) {
    const { idRestablecer } = req.params;
    const { usado } = req.body;
    try {
      const result = await RestablecerModelo.actualizarRegistro(idRestablecer, usado);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Registro no encontrado' });
      }
      res.json({ message: 'Registro actualizado' });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al actualizar el registro' });
    }
  }

  static async borrarRegistro(req, res) {
    const { idRestablecer } = req.params;
    try {
      const result = await RestablecerModelo.borrarRegistro(idRestablecer);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Registro no encontrado' });
      }
      res.json({ message: 'Registro eliminado' });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al eliminar el registro' });
    }
  }
}

module.exports = RestablecerControlador;
