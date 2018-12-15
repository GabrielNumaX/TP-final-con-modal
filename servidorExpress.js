var express = require('express');
var app = express();

app.use(express.static(__dirname + '/TP Catalogo 21.11.18'));

app.get('/', function (req, res) {
  res.sendFiles('index.html');
});

app.listen(8080, function(){
  console.log('Servidor Funcionando en Puerto 8080');
});

//este es el archivo que carga la pagina desde localhost:8080
//es una implementacion basica para html statico pero que logra cargar los css y js incrustado en el html
//cosa que no logre hacer utilizando solo node
//en los ejemplos que vi estaba el codigo de las rutas de las demas carpetas por ej la carpeta vistas
//de este proyecto, pero mi idea es que solo se acceda a la pagina pricipal y desde alli de navegue el sitio
