import { Router } from 'express';

// la clase BaseRouter va a actuar como bandera para extender clases, por lo tanto va a trabajar con genericos 
export class BaseRouter<T> { 
    public router: Router
    public controller: T;

    constructor(TController: { new(): T}){ // Al constructor le vamos a pasar un controlador generico de la clase que extienda de BaseController en nuestro ejemplo es de Users, pero podria ser de cualquier otra cosa
        this.router = Router()
        this.controller = new TController();
        this.routes();
    }

    routes(){}
}