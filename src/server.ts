import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { UserRouter } from './router/user.router';
import { ConfigServer } from './config/config';
import { DataSource } from 'typeorm';

class ServerBootstrap extends ConfigServer{
    public app: express.Application = express(); // Creamos una instancia de express
    private port: number = this.getNumberEnv('PORT');

    constructor(){
        super();
        // Configuramos middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        this.app.use(cors());

        this.dbConnect();

        this.app.use('/api', this.routers());
        this.listen();
    }

    routers(): Array<express.Router>{
        return [new UserRouter().router];
    };

    async dbConnect(): Promise<DataSource> {
        return await new DataSource(this.typeORMconfig).initialize();
    };

    public listen() { // para llamar a variables dentro de una clase usamos this
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    };
}

new ServerBootstrap();
