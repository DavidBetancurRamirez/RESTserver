const { Router } = require("express");
const { check } = require("express-validator");

const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto } = require("../controllers/productos");
const { existeProductoPorId, existeCategoriaPorId } = require("../helpers/db-validators");

const { validarJWT, esAdminRole } = require("../middlewares");
const { validarCampos } = require("../middlewares/validar-campos");


const router = Router();

// Obtener todas las categorias - publico
router.get("/", obtenerProductos)

// Obtener una categoria por id - publico
router.get("/:id", [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom( existeProductoPorId ),
    validarCampos
], obtenerProducto )

// Crear categoria - privado - cualquier persona con token valido
router.post("/", [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de Mongo").isMongoId(),
    check("categoria").custom( existeCategoriaPorId ),
    validarCampos
], crearProducto)

// Actualizar - privado - cualquier persona con token valido
router.put("/:id", [
    validarJWT,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom( existeProductoPorId ),
    validarCampos
], actualizarProducto)

// Borrar una categoria - admin
router.delete("/:id", [
    validarJWT,
    esAdminRole,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom( existeProductoPorId ),
    validarCampos
], borrarProducto)


module.exports = router;