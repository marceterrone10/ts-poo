import { BaseRouter } from '../shared/router/router';
import { UserController } from './controllers/user.controller';
import { UserMiddleware } from './middleware/user.middleware';

export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
    constructor() {
        super(UserController, UserMiddleware);
    }

    routes(): void {
        this.router.get('/user', (req, res) => this.controller.getUser(req, res));
        this.router.get('/user/:id', (req, res) => this.controller.getUserById(req, res));
        this.router.get('/user/relation/:id', (req, res) => this.controller.getUserWithRelationById(req, res));
        this.router.post('/user', (req, res, next) => this.middleware.validateUser(req, res, next), (req, res) => this.controller.createUser(req, res));
        this.router.put('/user/:id', (req, res, next) => this.middleware.validateUser(req, res, next), (req, res) => this.controller.updateUser(req, res));
        this.router.delete('/user/:id', (req, res) => this.controller.deleteUser(req, res));
    }
    
}

/*Cuando en UserRouter llamas a super(UserController), el BaseRouter crea una instancia de UserController y la asigna a this.controller.

Luego, en el método routes() de UserRouter, puedes definir endpoints (como /user, /user/:id, etc.) y usar los métodos de UserController a través de this.controller. Así, cada router usa su propio controlador para manejar las rutas que definas.*/