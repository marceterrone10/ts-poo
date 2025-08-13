import { Request, Response } from 'express';
import { ProductService } from '../services/product.services';

export class ProductController {
    constructor(private readonly productService: ProductService = new ProductService()) {}

    async getProducts(req: Request, res: Response) {
        try {
            const products = await this.productService.findAllProducts();
            res.json(products);
        } catch (error) {
            console.error("Error retrieving products:", error);
            res.status(500).json({ 
                message: "Internal Server Error" 
            });
        }
    };

    async getProductById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const product = await this.productService.findProductById(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json(product);
        } catch (error) {
            console.error("Error retrieving product:", error);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    };

    async createProduct(req: Request, res: Response) {
        try {
            const body = req.body;
            const newProduct = await this.productService.createProduct(body);
            res.status(201).json(newProduct);
        } catch (error) {
            console.error("Error creating product:", error);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    };

    async updateProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { body } = req.body;
            const data = await this.productService.updateProduct(id, body);
            res.status(200).json({
                "Product": data
            });
        } catch (error) {
            console.error("Error updating product:", error);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    };

    async deleteProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.productService.deleteProduct(id);
            res.status(204).send();
        } catch (error) {
            console.error("Error deleting product:", error);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    };

}
