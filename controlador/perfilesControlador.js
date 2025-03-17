const PerfilesModel = require('../modelo/perfilesModelo');

class PerfilesControlador {
  static async todoPerfiles(req, res) {
    try {
      const perfiles = await PerfilesModel.obtenerTodos();
      res.json(perfiles);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener los perfiles' });
    }
  }

  static async buscarPorIdUsuario(req, res) {
    const { idUsuario } = req.params;
    try {
      const perfil = await PerfilesModel.buscarPorIdUsuario(idUsuario);
      if (!perfil) {
        return res.status(404).json({ error: 'Perfil no encontrado' });
      }
      res.json(perfil);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el perfil' });
    }
  }

  static async buscarPorTelefono(req, res) {
    const { telefono } = req.params;
    try {
      const perfil = await PerfilesModel.buscarPorTelefono(telefono);
      if (!perfil) {
        return res.status(404).json({ error: 'Teléfono no encontrado' });
      }
      res.json(perfil);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el teléfono' });
    }
  }

  static async crearPerfil(req, res) {
    const { idUsuario, nombreCompleto, telefono, direccion, fotoPerfil } = req.body;
    try {
      const result = await PerfilesModel.crearPerfil(idUsuario, nombreCompleto, telefono, direccion, fotoPerfil);
      res.status(201).json({ message: 'Perfil creado', idPerfil: result.insertId });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al crear el perfil' });
    }
  }

  static async editarPerfil(req, res) {
    const { idUsuario } = req.params;
    const { nombreCompleto, telefono, direccion, fotoPerfil } = req.body;

    try {
      const result = await PerfilesModel.editarPerfil(idUsuario, nombreCompleto, telefono, direccion, fotoPerfil);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Perfil no encontrado' });
      }
      res.json({ message: 'Perfil actualizado' });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al actualizar el perfil' });
    }
  }

  static async borrarPerfil(req, res) {
    const { idUsuario } = req.params;
    try {
      const result = await PerfilesModel.borrarPerfil(idUsuario);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Perfil no encontrado' });
      }
      res.json({ message: 'Perfil eliminado' });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al eliminar el perfil' });
    }
  }
}

module.exports = PerfilesControlador;
