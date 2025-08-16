import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";
import { PurchaseProductsDTO } from "../dto/purchase-products.dto";

export class PurchaseProductsMiddleware {
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}
    purchaseProductsValidator(req: Request, res: Response, next: NextFunction) {
        const { quantity_product, total_price, purchase, product }= req.body;

        const valid = new PurchaseProductsDTO()

        valid.quantity_product = quantity_product;
        valid.total_price = total_price;
        valid.purchase = purchase;
        valid.product = product;

        validate(valid).then((error) => {
            if (error.length > 0) {
                return this.httpResponse.InternalServerError(res, error);
            } else {
                next();
            };
        });
    };
};