import { Sequelize } from "sequelize";
import db from "../config/db.js";

export const Hotel = db.define('hoteles', {
    id_htl: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true     
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    direccion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefono: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    }
});
