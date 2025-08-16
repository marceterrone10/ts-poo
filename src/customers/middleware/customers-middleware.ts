import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";
import { CustomerDTO } from "../dto/customer.dto";

export class CustomersMiddleware {
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}
    customersValidator(req: Request, res: Response, next: NextFunction) {
        const { address, dni, user }= req.body;

        const valid = new CustomerDTO()

        valid.address = address;
        valid.dni = dni;
        valid.user = user;

        validate(valid).then((error) => {
            if (error.length > 0) {
                return this.httpResponse.InternalServerError(res, error);
            } else {
                next();
            };
        });
    };
};