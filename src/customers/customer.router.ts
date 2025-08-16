import { BaseRouter } from '../shared/router/router';
import { CustomerController } from './controllers/customer.controller';
import { CustomersMiddleware } from './middleware/customers-middleware';

export class CustomerRouter extends BaseRouter<CustomerController, CustomersMiddleware> {
    constructor() {
        super(CustomerController, CustomersMiddleware);
    }

    routes(): void {
        this.router.get('/customer', (req, res) => this.controller.getCustomer(req, res));
        this.router.get('/customer/:id', (req, res) => this.controller.getCustomerById(req, res));
        this.router.get('/customer/relation/:id', (req, res) => this.controller.getCustomerWithRelationById(req, res));
        this.router.post('/customer', (req, res, next) => this.middleware.customersValidator(req, res, next), (req, res) => this.controller.createCustomer(req, res));
        this.router.put('/customer/:id', (req, res, next) => this.middleware.customersValidator(req, res, next), (req, res) => this.controller.updateCustomer(req, res));
        this.router.delete('/customer/:id', (req, res) => this.controller.deleteCustomer(req, res));
    }
    
}