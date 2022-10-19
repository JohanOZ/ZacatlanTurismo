import express from "express";
import { paginaInicio, 
    paginaAcerca, 
    paginaHoteles, 
    paginaGerentes, 
    paginaHabitaciones, 
    paginaDetalleHotel, 
    paginaDetalleGerente, 
    paginaDetalleHabitacion,
        } from "../controllers/paginasController.js";
import { guardarHotel, panelEditarHotel, editarHotel, eliminarHotel } from "../controllers/hotelController.js";
import { guardarGerente, panelEditarGerente, editarGerente, eliminarGerente } from "../controllers/gerenteController.js";
import { guardarHabitacion, panelEditarHabitacion, editarHabitacion, eliminarHabitacion } from "../controllers/habitacionController.js";

const router = express.Router();

router.get('/', paginaInicio);
router.get('/acerca', paginaAcerca);

router.get('/hoteles', paginaHoteles);
router.get('/gerentes', paginaGerentes);
router.get('/habitaciones', paginaHabitaciones);

router.get('/hoteles/:id', paginaDetalleHotel);
router.get('/gerentes/:id', paginaDetalleGerente);
router.get('/habitaciones/:id', paginaDetalleHabitacion);

router.get('/hoteles/editar/:id', panelEditarHotel);
router.get('/gerentes/editar/:id', panelEditarGerente)
router.get('/habitaciones/editar/:id', panelEditarHabitacion);

router.get('/hoteles/eliminar/:id', eliminarHotel);
router.get('/gerentes/eliminar/:id', eliminarGerente);
router.get('/habitaciones/eliminar/:id', eliminarHabitacion);

//Post

router.post('/hoteles', guardarHotel);
router.post('/gerentes', guardarGerente);
router.post('/habitaciones', guardarHabitacion);

router.post('/hoteles/editar', editarHotel)
router.post('/gerentes/editar', editarGerente);
router.post('/habitaciones/editar', editarHabitacion);

export default router;