import { Gerente } from "../models/Gerente.js";
import { Hotel } from "../models/Hotel.js";

const guardarGerente = async (req, res) => {
    //Validar form
    const { id_htl, nombre, ap_paterno, ap_materno, telefono } = req.body;

    const hotelVerificacion = await Gerente.findOne({ where: { id_htl } });

    let errores = [];

    let telefonoCheck = (telefono) => {
        let valores = /^[0-9]+$/;
        if (telefono.match(valores)) {
            return true;
        } else {
            return false;
        }
    }

    if (hotelVerificacion!=null) {
        if(verificar.id_grt != id_grt) {
            errores.push({error: 'Ese hotel ya tiene un gerente'});
        }
    }

    if(nombre.trim() === '') {
        errores.push({mensaje: 'El nombre está vacio'});
    }

    if(nombre.length>40) {
        errores.push({mensaje: 'El nombre no debe exceder los 40 caracteres'});
    }

    if(ap_paterno.trim() === '') {
        errores.push({mensaje: 'El apellido paterno está vacio'});
    }

    if(ap_paterno.length>20) {
        errores.push({mensaje: 'La apellido paterno no puede exceder los 20 caracteres'});
    }

    if(ap_materno.trim() === '') {
        errores.push({mensaje: 'El apellido materno está vacio'});
    }

    if(ap_materno.length>20) {
        errores.push({mensaje: 'La apellido materno no puede exceder los 20 caracteres'});
    }

    if(telefono.length!=10) {
        errores.push({mensaje: 'El telefono es a 10 digitos'});
    }

    if(telefonoCheck(telefono) == false) {
        errores.push({mensaje: 'El telefono solo puede tener números'});
    }

    if(errores.length > 0) {

        const gerentes = await Gerente.findAll();
        const hoteles = await Hotel.findAll();
        //Mostrar errores
        res.render('gerentes', {
            pagina: 'Gerentes',
            errores,
            nombre,
            ap_paterno,
            ap_materno,
            telefono,
            gerentes,
            hoteles
        });
    } else {
        //Almacenar gerente

        try {
            await Gerente.create({
                id_htl,
                nombre,
                ap_paterno,
                ap_materno,
                telefono,
            });

            res.redirect('/gerentes');
        } catch (error) {
            console.log(error);
        }

    }

};

const panelEditarGerente = async (req, res) => {
    const { id } = req.params;
    
    try {
        const gerente = await Gerente.findByPk(id);
        const hoteles = await Hotel.findAll();

        res.render('edicionGerente', {
            pagina: 'Editar Gerente',
            gerente,
            hoteles
        })
    } catch (error) {
        console.log(error);
    }
}

const editarGerente = async (req, res) => {

    const { id_grt, id_htl, nombre, ap_paterno, ap_materno, telefono } = req.body;

    const hotelVerificacion = await Gerente.findOne({ where: { id_htl } });

    let errores = [];

    let telefonoCheck = (telefono) => {
        let valores = /^[0-9]+$/;
        if (telefono.match(valores)) {
            return true;
        } else {
            return false;
        }
    }

    if (hotelVerificacion!=null) {
        if(hotelVerificacion.id_grt != id_grt) {
            errores.push({mensaje: 'Ya existe un gerente para ese hotel'})
        }
    }

    if(nombre.trim() === '') {
        errores.push({mensaje: 'El nombre está vacio'});
    }

    if(nombre.length>40) {
        errores.push({mensaje: 'El nombre no debe exceder los 40 caracteres'});
    }

    if(ap_paterno>20 || ap_materno>20) {
        errores.push({mensaje: 'Los apellidos no pueden exceder los 20 caracteres'});
    }

    if(ap_paterno.trim() === '' || ap_materno.trim() === '' ) {
        errores.push({mensaje: 'El apellido está vacio'});
    }

    if(telefono.length!=10) {
        errores.push({mensaje: 'El telefono es a 10 digitos'});
    }

    if(telefonoCheck(telefono) == false) {
        errores.push({mensaje: 'El campo telefono solo puede tener números'});
    }

    if(errores.length > 0) {

        const gerente = await Gerente.findByPk(id_grt);
        const hoteles = await Hotel.findAll();
        res.render('edicionGerente', {
            pagina: 'Editar Gerente',
            id_grt,
            nombre,
            ap_paterno,
            ap_materno,
            telefono,
            gerente,
            hoteles,
            errores  
        });
    } else {
        //Actualizar gerente

        try {
            await Gerente.update({
                id_htl,
                nombre,
                ap_paterno,
                ap_materno,
                telefono
            }, {
                where: {
                    id_grt
                }
            })
            res.redirect('/gerentes');
        } catch (error) {
            console.log(error);
        }

    }
}

const eliminarGerente = async (req, res) => {
    const { id } = req.params;

    try {
        
        await Gerente.destroy({
            where: {
                id_grt: id
            }
        })

        res.redirect('/gerentes');

    } catch (error) {
        console.log(error);
    }
}

export {
    guardarGerente,
    panelEditarGerente,
    editarGerente,
    eliminarGerente
}