const express = require("express")
const cors = require("cors")

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = "/api/usuarios";

        // Middlewares
        this.middlewares();


        // Rutas
        this.routes();
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
        this.app.use(this.usuariosPath, require("../routes/usuarios.routes"))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto", this.port)
        })
    }
}

module.exports = Server;