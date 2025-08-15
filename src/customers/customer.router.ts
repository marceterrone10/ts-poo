import { BaseRouter } from '../shared/router/router';
import { CustomerController } from './controllers/customer.controller';

export class CustomerRouter extends BaseRouter<CustomerController> {
    constructor() {
        super(CustomerController);
    }

    routes(): void {
        this.router.get('/customer', (req, res) => this.controller.getCustomer(req, res));
        this.router.get('/customer/:id', (req, res) => this.controller.getCustomerById(req, res));
        this.router.get('/customer/relation/:id', (req, res) => this.controller.getCustomerWithRelationById(req, res));
        this.router.post('/customer', (req, res) => this.controller.createCustomer(req, res));
        this.router.put('/customer/:id', (req, res) => this.controller.updateCustomer(req, res));
        this.router.delete('/customer/:id', (req, res) => this.controller.deleteCustomer(req, res));
    }
    
}