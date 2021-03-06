const express = require("express")
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: "/api/auth",
            buscar: "/api/buscar",
            categorias: "/api/categorias",
            productos: "/api/productos",
            usuarios: "/api/usuarios"
        }

        //Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // Directorio publico
        this.app.use(express.static("public"));

        // Cors
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );
    }

    routes() {
        this.app.use(this.paths.auth, require("../routes/auth.routes"))
        this.app.use(this.paths.buscar, require("../routes/buscar.routes"))
        this.app.use(this.paths.categorias, require("../routes/categorias.routes"))
        this.app.use(this.paths.productos, require("../routes/productos.routes"))
        this.app.use(this.paths.usuarios, require("../routes/usuarios.routes"))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto", this.port)
        })
    }
}

module.exports = Server;