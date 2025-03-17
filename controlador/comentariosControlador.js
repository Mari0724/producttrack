const comentariosModelo = require('../modelo/comentariosModelo');

class comentariosControlador {
  static async todocomentarios(req, res) {
    try {
      const com = await ComentariosModel.todocomentarios();
      res.json(com);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener los comentarios' });
    }
  }

  static async buscarPorId(req, res) {
    const { id } = req.params;
    try {
      const coment = await ComentariosModel.buscarPorId(id);
      if (!coment) {
        return res.status(404).json({ error: 'Comentario no encontrado' });
      }
      res.json(coment);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el comentario' });
    }
  }

  static async buscarPorResena(req, res) {
    const { res} = req.params;
    try {
      const resena = await ComentariosModel.buscarPorResena(res);
      if (!resena) {
        return res.status(404).json({ error: 'Reseña no encontrado' });
      }
      res.json(resena);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el reseña' });
    }
  }
  
  static async buscarPorObserv(req, res) {
    const { obs} = req.params;
    try {
      const observ = await ComentariosModel.buscarPorObserv(obs);
      if (!observ) {
        return res.status(404).json({ error: 'Observación no encontrado' });
      }
      res.json(observ);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener la observación' });
    }
  }
  
  static async crearCom(req, res) {
    const { articulo } = req.body;
    try {
      const result = await ComentariosModel.crearCom(res, obs);
      res.status(201).json({ message: 'Producto creado', idProducto: result.insertId });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al crear el comentario' });
    }
  }

  static async modificarCom(req, res) {
    const { id } = req.params;
    const { res } = req.body;
    const { obs } = req.body;
    try {
      const result = await ComentariosModel.modificarCom(res, obs);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'comentario no encontrado' });
      }
      res.json({ message: 'Producto actualizado' });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al actualizar el comentario' });
    }
  }

  static async eliminarCom(req, res) {
    const { id } = req.params;
    try {
      const result = await ComentariosModel.eliminarCom(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'comentario no encontrado' });
      }
      res.json({ message: 'Producto eliminado' });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al eliminar el comentario' });
    }
  }
}

module.exports = comentariosControlador;