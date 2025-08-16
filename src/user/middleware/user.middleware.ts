import { NextFunction, Request, Response } from "express";
import { UserDTO } from "../dto/user.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";

export class UserMiddleware {
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}
    userValidator(req: Request, res: Response, next: NextFunction) {
        const { username,name,lastname,email,password,city,province,role }= req.body;

        const valid = new UserDTO()

        valid.lastname = lastname
        valid.name = name
        valid.username = username
        valid.email = email
        valid.password = password
        valid.city = city
        valid.province = province
        valid.role = role

        validate(valid).then((error) => {
            if (error.length > 0) {
                return this.httpResponse.InternalServerError(res, error);
            } else {
                next();
            };
        });
    };
};