const { response } = require('express');
const Evento = require('../models/Evento');


const getEventos = async (req, res = response) => {

    //Rellenar los datos del usuario asociado a la publicación
    const eventos = await Evento.find()
        .populate('user', 'name email')


    res.status(200).json({
        ok: true,
        msg: eventos
    })
}

const crearEvento = async (req, res = response) => {

    //Verificar que tenga el evento.
    console.log(req.body)
    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        res.status(200).json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error al crear el evento'
        })
    }

}

const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid
    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con esa id'
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permiso para editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        //new: true, retorna los elementos acutalizados
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid
    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con esa id'
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permiso para eliminar este evento'
            })
        }

        //new: true, retorna los elementos acutalizados
        await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok: true,
            msg: "Evento eliminado"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}