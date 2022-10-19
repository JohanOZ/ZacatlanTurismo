import { Gerente } from "../models/Gerente.js";
import { Habitacion } from "../models/Habitacion.js";
import { Hotel } from "../models/Hotel.js";

const paginaInicio = (req, res) => {
    
    res.render('inicio', {
        pagina: "Inicio",
        clase: "home"
    });

};

const paginaAcerca = (req, res) => {
    res.render('acerca', {
        pagina: "Acerca",
    });
};

const paginaHoteles = async (req, res) => {
    //Consultar bd
    const hoteles = await Hotel.findAll();

    res.render('hoteles', {
        pagina: "Hoteles",
        hoteles
    });
};

const paginaGerentes = async (req, res) => {
    //Consultar bd
    const gerentes = await Gerente.findAll();
    const hoteles = await Hotel.findAll();

    res.render('gerentes', {
       pagina: "Gerentes",
       gerentes,
       hoteles 
    });
};

const paginaHabitaciones = async (req, res) => {
    //Consultar bd
    const habitaciones = await Habitacion.findAll();
    const hoteles = await Hotel.findAll();
    
    res.render('habitaciones', {
       pagina: "Habitaciones",
       habitaciones,
       hoteles
    });
};

const paginaDetalleHotel = async (req, res) => {
    const { id } = req.params;
    //Consultar bd
    try {
        const hotel = await Hotel.findByPk(id);
        const gerente = await Gerente.findOne({
            where: {
                id_htl: id
            }
        });
        const resultado = await Habitacion.count({
            where: {
                id_htl: id
            }
        })
        res.render('hotel', {
            pagina: 'Detalle Hotel',
            hotel,
            gerente,
            resultado
        });

    } catch {
        console.log(error);
    }
};

const paginaDetalleGerente = async (req, res) => {
    const { id } = req.params;
    //Consultar bd
    try {
        const gerente = await Gerente.findByPk(id);
        const hotel = await Hotel.findOne({
            where: {
                id_htl: gerente.id_htl
            }
        })
        res.render('gerente', {
            pagina: 'Detalle Gerente',
            gerente,
            hotel
        });
        
    } catch {
        console.log(error);
    }
};

const paginaDetalleHabitacion = async (req, res) => {
    const { id } = req.params;
    //Consultar bd
    try {
        const habitacion = await Habitacion.findByPk(id);
        const hotel = await Hotel.findByPk(habitacion.id_htl);
        res.render('habitacion', {
            pagina: 'Detalle Habitacion',
            habitacion,
            hotel
        });
    } catch {
        console.log(error);
    }
};
export {
    paginaInicio,
    paginaAcerca,
    paginaHoteles,
    paginaGerentes,
    paginaHabitaciones,
    paginaDetalleHotel,
    paginaDetalleGerente,
    paginaDetalleHabitacion
}