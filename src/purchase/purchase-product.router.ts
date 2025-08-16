import { BaseRouter } from '../shared/router/router';
import { PurchaseProductController } from './controllers/purchase-product.controller';
import { PurchaseProductsMiddleware } from './middleware/purchase-products.middleware';

export class PurchaseProductRouter extends BaseRouter<PurchaseProductController, PurchaseProductsMiddleware> {
    constructor() {
        super(PurchaseProductController, PurchaseProductsMiddleware);
    }

    routes(): void {
        this.router.get('/purchase-product', (req, res) => this.controller.getAll(req, res));
        this.router.get('/purchase-product/:id', (req, res) => this.controller.getById(req, res));
        this.router.post('/purchase-product', (req,res,next) => this.middleware.purchaseProductsValidator(req, res, next) ,(req, res) => this.controller.create(req, res));
        this.router.put('/purchase-product/:id', (req,res,next) => this.middleware.purchaseProductsValidator(req, res, next) ,(req, res) => this.controller.update(req, res));
        this.router.delete('/purchase-product/:id', (req, res) => this.controller.delete(req, res));
    }
    
}