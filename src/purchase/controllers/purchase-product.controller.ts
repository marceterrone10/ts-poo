import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { PurchaseProductService } from "../services/purchase-product.service";

export class PurchaseProductController {
    constructor(
        private readonly purchaseProductService: PurchaseProductService = new PurchaseProductService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){}

    async getAll(req: Request, res: Response){
        try {
            const data = await this.purchaseProductService.findAll();
            if(data.length === 0){
                return this.httpResponse.NotFound(res, "No purchase products found");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error retrieving purchase products:", error);
            return this.httpResponse.InternalServerError(res, "Error retrieving purchase products");
        }
    }

    async getById(req: Request, res: Response){
        try {
            const { id } = req.params;
            const data = await this.purchaseProductService.findById(id);
            if(!data){
                return this.httpResponse.NotFound(res, "Purchase product not found");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error retrieving purchase product:", error);
            return this.httpResponse.InternalServerError(res, "Error retrieving purchase product");
        }
    }

    async create(req: Request, res: Response){
        try {
            const body = req.body;
            const data = await this.purchaseProductService.create(body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error creating purchase product:", error);
            return this.httpResponse.InternalServerError(res, "Error creating purchase product");
        }
    }

    async update(req: Request, res: Response){
        try {
            const { id } = req.params;
            const body = req.body;
            const data = await this.purchaseProductService.update(id, body);
            if(!data){
                return this.httpResponse.NotFound(res, "Purchase product not found");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error updating purchase product:", error);
            return this.httpResponse.InternalServerError(res, "Error updating purchase product");
        }
    }

    async delete(req: Request, res: Response){
        try {
            const { id } = req.params;
            const data = await this.purchaseProductService.delete(id);
            if(!data){
                return this.httpResponse.NotFound(res, "Purchase product not found");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error deleting purchase product:", error);
            return this.httpResponse.InternalServerError(res, "Error deleting purchase product");
        }
    }
}
