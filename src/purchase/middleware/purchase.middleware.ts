import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";
import { PurchaseDTO } from "../dto/purchase.dto";

export class PurchaseMiddleware {
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}
    purchaseValidator(req: Request, res: Response, next: NextFunction) {
        const { status, payment_method, customer }= req.body;

        const valid = new PurchaseDTO()

        valid.status = status;
        valid.payment_method = payment_method;
        valid.customer = customer;

        validate(valid).then((error) => {
            if (error.length > 0) {
                return this.httpResponse.InternalServerError(res, error);
            } else {
                next();
            };
        });
    };
};