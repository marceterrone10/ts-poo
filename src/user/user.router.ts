import { BaseRouter } from '../router/router';
import { UserController } from './controllers/user.controller';

export class UserRouter extends BaseRouter<UserController> {
    constructor() {
        super(UserController);
    }

    routes(): void {
        this.router.get('/user', (req, res) => this.controller.getUser(req, res));
    }
}

/*Cuando en UserRouter llamas a super(UserController), el BaseRouter crea una instancia de UserController y la asigna a this.controller.

Luego, en el método routes() de UserRouter, puedes definir endpoints (como /user, /user/:id, etc.) y usar los métodos de UserController a través de this.controller. Así, cada router usa su propio controlador para manejar las rutas que definas.*/