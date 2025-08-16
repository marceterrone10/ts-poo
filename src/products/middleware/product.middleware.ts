import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";
import { ProductDTO } from "../dto/product.dto";

export class ProductsMiddleware {
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}
    productsValidator(req: Request, res: Response, next: NextFunction) {
        const { product_name, description, price }= req.body;

        const valid = new ProductDTO()

        valid.product_name = product_name;
        valid.description = description;
        valid.price = price;

        validate(valid).then((error) => {
            if (error.length > 0) {
                return this.httpResponse.InternalServerError(res, error);
            } else {
                next();
            };
        });
    };
};