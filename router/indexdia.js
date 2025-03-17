const express = require('express');
const path = require('path'); 
const router = express.Router();

//rutas
router.get('/', (req, rest) =>{
    const indexPath = path.join(__dirname, '..', 'public', 'Registro.html')
    rest.sendFile(indexPath);
});
router.get('/Perfil', (req, rest) =>{
    const indexPath = path.join(__dirname, '..', 'public', 'Perfil.html')
    rest.sendFile(indexPath);
});
router.get('/ResContra', (req, rest) =>{
    const indexPath = path.join(__dirname, '..', 'public', 'restablesercontrasena.html')
    rest.sendFile(indexPath);
});

////

router.get('/comentarios', (req, rest) =>{
    const indexPath = path.join(__dirname, '..', 'public', 'comentarios.html')
    rest.sendFile(indexPath);
});

router.get('/visualizar', (req, rest) =>{
    const indexPath = path.join(__dirname, '..', 'public', 'inventario.html')
    rest.sendFile(indexPath);
});

router.get('/modificar', (req, rest) =>{
    const indexPath = path.join(__dirname, '..', 'public', 'minventario.html')
    rest.sendFile(indexPath);
});



module.exports = router;