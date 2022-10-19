import { Hotel } from "../models/Hotel.js";
import { Gerente } from "../models/Gerente.js";
import { Habitacion } from "../models/Habitacion.js";
const guardarHotel = async (req, res) => {

    //Validar Form
    const { nombre, direccion, telefono, correo } = req.body;

    let errores = [];
    let telefonoCheck = (telefono) => {
        let valores = /^[0-9]+$/;
        if (telefono.match(valores)) {
            return true;
        } else {
            return false;
        }
    }

    if(nombre.trim() === '') {
        errores.push({mensaje: 'El nombre está vacio'});
    }

    if(nombre.length>40) {
        errores.push({mensaje: 'El nombre no debe exceder los 40 caracteres'});
    }

    if(direccion.trim() === '') {
        errores.push({mensaje: 'La dirección está vacia'});
    }

    if(direccion.length>100) {
        errores.push({mensaje: 'La dirección no puede exceder los 100 caracteres'});
    }

    if(telefono.length!=10) {
        errores.push({mensaje: 'El telefono es a 10 digitos'});
    }

    if(telefonoCheck(telefono) == false) {
        errores.push({mensaje: 'El campo telefono solo puede tener números'});
    }

    if(correo.trim() === '' || correo.length>50) {
        errores.push({mensaje: 'El correo está vacio'});
    }

    if(errores.length > 0) {

        const hoteles = await Hotel.findAll();

        //Mostrar errores
        res.render('hoteles', {
            pagina: 'Hoteles',
            errores,
            nombre,
            direccion,
            telefono,
            correo,
            hoteles
        });
    } else {
        //Almacenar hotel

        try {
            await Hotel.create({
                nombre,
                direccion,
                telefono,
                correo,
            });

            res.redirect('/hoteles');
            
        } catch (error) {
            console.log(error);
        }

    }
}

const panelEditarHotel = async (req, res) => {
    const { id } = req.params;

    try {
        const hotel = await Hotel.findByPk(id);
        res.render('edicionHotel', {
            pagina: 'Editar Hotel',
            hotel
        })
    } catch (error) {
        console.log(error);
    }
}

const editarHotel = async (req, res) => {
    const { id_htl, nombre, direccion, telefono, correo } = req.body;
    let errores = [];
    let telefonoCheck = (telefono) => {
        let valores = /^[0-9]+$/;
        if (telefono.match(valores)) {
            return true;
        } else {
            return false;
        }
    }

    if(nombre.trim() === '') {
        errores.push({mensaje: 'El nombre está vacio'});
    }

    if(nombre.length>40) {
        errores.push({mensaje: 'El nombre no debe exceder los 40 caracteres'});
    }

    if(direccion.trim() === '') {
        errores.push({mensaje: 'La dirección está vacia'});
    }

    if(direccion.length>100) {
        errores.push({mensaje: 'La dirección no puede exceder los 100 caracteres'});
    }

    if(telefono.length!=10) {
        errores.push({mensaje: 'El telefono es a 10 digitos'});
    }

    if(telefonoCheck(telefono) == false) {
        errores.push({mensaje: 'El campo telefono solo puede tener números'});
    }

    if(correo.trim() === '' || correo.length>50) {
        errores.push({mensaje: 'El correo está vacio'});
    }

    if(errores.length > 0) {

        const hotel = await Hotel.findByPk(id_htl);
        res.render('edicionHotel', {
            pagina: 'Editar Hotel',
            nombre,
            direccion,
            telefono,
            correo,
            hotel,
            errores
        });
    } else {
        //Actualizar hotel

        try {
            await Hotel.update({
                nombre,
                direccion,
                telefono,
                correo
            }, {
                where: {
                    id_htl
                }
            })
            res.redirect('/hoteles');
        } catch (error) {
            console.log(error);
        }

    }
}

const eliminarHotel = async(req, res) => {
    const { id } = req.params;

    try {

        await Hotel.destroy({
            where: {
                id_htl: id
            },
            cascade: true
        })

        res.redirect('/hoteles');
        
    } catch (error) {
        console.log(error);
    }
}

export {
    guardarHotel,
    panelEditarHotel,
    editarHotel,
    eliminarHotel
}