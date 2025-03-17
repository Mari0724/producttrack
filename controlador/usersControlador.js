const UsersModel = require('../modelo/usersModelo');

class UsersControlador{
  static async todoUsers(req, res) {
    try {
      const user = await UsersControlador.todoUsers();
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener los usuarios' });
    }
  }

  static async busquedaPorId(req, res) {
    const { id } = req.params;
    try {
      const user = await UsersControlador.buscarPorId(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el usuario' });
    }
  }

  static async buscarPorUsNam(req, res) {
    const {usename} = req.params;
    try {
      const user = await UsersControlador.buscarPorUsNam(usename);
      if (!user) {
        return res.status(404).json({ error: 'Nombre de usuario no encontrado' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el nombre de usuario' });
    }
  }

  static async buscarPorNomEmp(req, res) {
    const {namEmp} = req.params;
    try {
      const user = await UsersControlador.buscarPorNomEmp(namEmp);
      if (!user) {
        return res.status(404).json({ error: 'Nombre de empresa no encontrado' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el nombre de empresa' });
    }
  }

  static async buscarPorNIT(req, res) {
    const {nit} = req.params;
    try {
      const user = await UsersControlador.buscarPorNIT(nit);
      if (!user) {
        return res.status(404).json({ error: 'nit de usuario no encontrado' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el nit' });
    }
  }

  static async buscarPorCorreo(req, res) {
    const {email} = req.params;
    try {
      const user = await UsersControlador.buscarPorCorreo(email);
      if (!user) {
        return res.status(404).json({ error: 'nit de usuario no encontrado' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el nit' });
    }
  }

  static async buscarPorRol(req, res) {
    const {r} = req.params;
    try {
      const user = await UsersControlador.buscarPorRol(r);
      if (!user) {
        return res.status(404).json({ error: 'rol de usuario no encontrado' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el rol' });
    }
  }

  static async crearUsuario(req, res) {
    const { articulo } = req.body;
    try {
      const result = await UsersControlador.crearUsuarios(usename, email, contra, namEmp, nit);
      res.status(201).json({ message: 'Usuario creado', idUsuario: result.insertId });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al crear el usuario' });
    }
  }

  static async editarUsuario(req, res) {
    const { id } = req.params;
    const { usename } = req.body;
    const { email } = req.body;
    const { contra } = req.body;
    const { namEmp } = req.body;
    const { nit } = req.body;

    try {
      const result = await UsersControlador.modificarUsuario(usename, email, contra, namEmp, nit, id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'usuario no encontrado' });
      }
      res.json({ message: 'Usuario actualizado' });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al actualizar el Usuario' });
    }
  }

  static async borrarUsuario(req, res) {
    const { id } = req.params;
    try {
      const result = await UsersControlador.eliminarUsuario(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json({ message: 'Usuario eliminado' });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al eliminar el usuario' });
    }
  }
}

module.exports =  UsersControlador;