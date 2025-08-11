import { Router } from 'express';


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

/*
BaseRouter es una clase base genérica pensada para ser extendida por routers de distintas entidades (usuarios, productos, etc.).
Al extenderla, le pasas el controlador correspondiente como parámetro genérico.
El constructor de BaseRouter crea una instancia de ese controlador y la asigna a this.controller.
Así, this.controller tendrá todos los métodos definidos en el controlador que le pasaste (por ejemplo, getUser en UserController).
Luego, en el router específico, puedes usar esos métodos para definir las rutas que necesites.
*/