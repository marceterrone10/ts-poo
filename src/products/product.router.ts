import { BaseRouter } from '../shared/router/router';
import { ProductController} from './controllers/product.controllers';
import { ProductsMiddleware } from './middleware/product.middleware';

export class ProductRouter extends BaseRouter<ProductController, ProductsMiddleware> {
    constructor() {
        super(ProductController, ProductsMiddleware);
    }

    routes(): void {
        this.router.get('/product', (req, res) => this.controller.getProducts(req, res));
        this.router.get('/product/:id', (req, res) => this.controller.getProductById(req, res));
        this.router.post('/product', (req, res, next) => this.middleware.productsValidator(req,res,next) ,(req, res) => this.controller.createProduct(req, res));
        this.router.put('/product/:id', (req, res, next) => this.middleware.productsValidator(req,res,next), (req, res) => this.controller.updateProduct(req, res));
        this.router.delete('/product/:id', (req, res) => this.controller.deleteProduct(req, res));
    }
    
}