const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); 
const app = express();
const indexDia = require('./router/indexdia');

//Middleware
app.use(express.static(path.join(__dirname, 'public')));
app. use(bodyParser.json()); //jnson a html
app. use(cors());
app.use('/', indexDia);



//crear el servidor
const PORT = 3070;
app.listen(PORT, () => {
    console.log (`Servidor Corriendo en http://localhost:${PORT}`) //lo que queremos ver por consola
}); 
