import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";
import { CategoryDTO } from "../dto/category.dto";

export class CategoryMiddleware {
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}
    categoriesValidator(req: Request, res: Response, next: NextFunction) {
        const { category_name, products }= req.body;

        const valid = new CategoryDTO()

        valid.category_name = category_name;
        valid.products = products;

        validate(valid).then((error) => {
            if (error.length > 0) {
                return this.httpResponse.InternalServerError(res, error);
            } else {
                next();
            };
        });
    };
};