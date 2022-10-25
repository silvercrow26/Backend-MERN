/*
    host + /api/events
*/

const {Router} = require('express');
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Todas a partir de aqui, tienen que pasar por la validación del JWT
router.use(validarJWT);

//Obtener eventos
router.get('/', getEventos)

//Crear evento
router.post('/',
[
    check('title','El título es obligatorio').not().isEmpty(),
    check('start','Fecha inicio es obligatoria').custom( isDate ),
    check('end','Fecha de finalización es obligatoria').custom( isDate ),
    validarCampos

] , crearEvento)

// //Actualizar evento
router.put('/:id',
[
    check('title','El título es obligatorio').not().isEmpty(),
    check('start','Fecha inicio es obligatoria').custom( isDate ),
    check('end','Fecha de finalización es obligatoria').custom( isDate ),
    validarCampos

], actualizarEvento)

// //Eliminar evento
router.delete('/:id', eliminarEvento)

module.exports = router;