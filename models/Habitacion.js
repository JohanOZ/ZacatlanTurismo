import { Sequelize } from "sequelize";
import db from "../config/db.js";
import { Hotel } from "./Hotel.js";

export const Habitacion = db.define('habitaciones', {
    id_hbt: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true   
    },
    id_htl: {                     //Llave Foranea
        type: Sequelize.INTEGER,
        allowNull: false
    }, 
    piso: {
        type: Sequelize.STRING
    },
    nombre: {
        type: Sequelize.STRING
    },
    refrigerador: {
        type: Sequelize.BOOLEAN
    }
});

Habitacion.belongsTo(Hotel, {foreignKey : "id_htl"});
Hotel.hasMany(Habitacion, {foreignKey : "id_htl"});