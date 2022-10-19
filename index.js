import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js"
import dotenv from "dotenv/config";

const app = express();

//Conectar a la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada') )
    .catch(error => console.log(error));

//Definir puerto
const port = process.env.PORT || 4000;

//Habilitar PUG
app.set('view engine', 'pug');

//Obtener año actual 
app.use( (req, res, next) => {
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Turismo Zacatlán";
    return next();
});

//Agregar body parser para leer datos del form
app.use(express.urlencoded({ extended: true }));

//Agregar router
app.use('/', router);

//Definir carpeta pública
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});