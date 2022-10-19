import { Habitacion } from "../models/Habitacion.js";
import { Hotel } from "../models/Hotel.js";

const guardarHabitacion = async (req, res) => {

    //Validar form
    let { id_htl, piso, nombre, refrigerador } = req.body;

    let checkBoxABoolean = (checkBox) => {
        if (checkBox=='on') {
            return true;
        } else {
            return false;
        }
    }

    refrigerador = checkBoxABoolean(refrigerador);
    
    let errores = [];

    if(piso.trim() === '') {
        errores.push({mensaje: 'El piso está vacio'});
    }

    if(piso.length>10) {
        errores.push({mensaje: 'El piso no debe exceder los 10 caracteres'});
    }

    if(nombre.trim() === '') {
        errores.push({mensaje: 'El nombre está vacio'});
    }

    if(nombre.length>30) {
        errores.push({mensaje: 'El nombre no puede exceder los 30 caracteres'});
    }

    if(errores.length > 0) {

        const habitaciones = await Habitacion.findAll();
        const hoteles = await Hotel.findAll();

        //Mostrar errores
        res.render('habitaciones', {
            pagina: 'Habitaciones',
            errores,
            piso,
            nombre,
            habitaciones,
            hoteles
        });
    } else {
        //Almacenar hotel
        try {
            await Habitacion.create({
                id_htl,
                piso,
                nombre,
                refrigerador,
            });

            res.redirect('/habitaciones');
            
        } catch (error) {
            console.log(error);
        }

    }
}

const panelEditarHabitacion = async (req, res) => {
    const { id } = req.params;

    try {
        const habitacion = await Habitacion.findByPk(id);
        const hoteles = await Hotel.findAll();

        res.render('edicionHabitacion', {
            pagina: 'Editar Habitación',
            habitacion,
            hoteles
        })
    } catch (error) {
        console.log(error);
    }
}

const editarHabitacion = async (req, res) => {
    let { id_hbt, id_htl, piso, nombre, refrigerador, } = req.body;

    let checkBoxABoolean = (checkBox) => {
        if (checkBox=='on') {
            return true;
        } else {
            return false;
        }
    }

    refrigerador = checkBoxABoolean(refrigerador);

    let errores = [];
    
    if(nombre.trim() === '') {
        errores.push({mensaje: 'El nombre está vacio'});
    }

    if(nombre.length>40) {
        errores.push({mensaje: 'El nombre no debe exceder los 40 caracteres'});
    }

    if(piso.trim() === '') {
        errores.push({mensaje: 'El piso está vacio'});
    }

    if(piso.length>10) {
        errores.push({mensaje: 'El piso no debe exceder los 10 caracteres'});
    }    

    if(errores.length > 0) {

        const habitacion = await Habitacion.findByPk(id_hbt);
        const hoteles = await Hotel.findAll();
        res.render('edicionGerente', {
            pagina: 'Editar Hotel',
            id_hbt,
            piso,
            nombre,
            refrigerador,
            habitacion,
            hoteles,
            errores  
        });
    } else {
        //Actualizar Habitacion

        try {
            await Habitacion.update({
                id_htl,
                piso,
                nombre,
                refrigerador
            }, {
                where: {
                    id_hbt
                }
            })
            res.redirect('/habitaciones');
        } catch (error) {
            console.log(error);
        }

    }
}

const eliminarHabitacion = async (req, res) => {
    const { id } = req.params;

    try {
        
        await Habitacion.destroy({
            where: {
                id_hbt: id
            }
        })

        res.redirect('/habitaciones');

    } catch (error) {
        console.log(error);
    }
}
export {
    guardarHabitacion,
    panelEditarHabitacion,
    editarHabitacion,
    eliminarHabitacion
}