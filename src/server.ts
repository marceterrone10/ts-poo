import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { UserRouter } from './router/user.router';

class ServerBootstrap {
    public app: express.Application = express(); // Creamos una instancia de express
    private port: number = 8000;

    constructor(){
        // Configuramos middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        this.app.use(cors());

        this.app.use('/api', this.routers());
        this.listen();
    }

    routers(): Array<express.Router>{
        return [new UserRouter().router];
    };

    public listen() { // para llamar a variables dentro de una clase usamos this
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    };
}

new ServerBootstrap();
