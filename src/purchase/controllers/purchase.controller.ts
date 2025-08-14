import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { PurchaseService } from "../services/purchase.service";
import { DeleteResult, UpdateResult } from "typeorm";

export class PurchaseController {

    constructor(
        private readonly purchaseService: PurchaseService = new PurchaseService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){}

    async getPurchases(req: Request, res: Response) {
        try {
            const purchases = await this.purchaseService.findAllPurchases();
            if(purchases.length === 0){
                return this.httpResponse.NotFound(res, "No purchases found");
            }
            return this.httpResponse.Ok(res, purchases);
        } catch (error) {
            console.error("Error retrieving purchase:", error);
            return this.httpResponse.InternalServerError(res, "Error retrieving purchase");
        }
    }
    async getPurchaseById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.purchaseService.findPurchaseById(id);
            if(!data){
                return this.httpResponse.NotFound(res, "Purchase not found");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error retrieving purchase:", error);
            return this.httpResponse.InternalServerError(res, "Error retrieving purchase");
        }
    }

    async createPurchase(req: Request, res: Response) {
        try {
            const body = req.body;
            const data = await this.purchaseService.createPurchase(body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error creating purchase:", error);
            return this.httpResponse.InternalServerError(res, "Error creating purchase");
        }
    }

    async updatePurchase(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const body = req.body;
            const data: UpdateResult = await this.purchaseService.updatePurchase(id, body);
            if(!data.affected){
                return this.httpResponse.NotFound(res, "Error updating purchase");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error updating purchase:", error);
            return this.httpResponse.InternalServerError(res, "Error retrieving purchase");
        }
    }

    async deletePurchase(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.purchaseService.deletePurchase(id);
            if(!data.affected){
                return this.httpResponse.NotFound(res, "Error deleting purchase");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error deleting purchase:", error);
            return this.httpResponse.InternalServerError(res, "Error retrieving purchase");
        }
    }
}