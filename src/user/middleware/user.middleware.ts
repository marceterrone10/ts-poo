import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { UserSchema } from "../schema/user.schema";

/*
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
};*/

export class UserMiddleware {
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}
    validateUser(req: Request, res: Response, next: NextFunction){
        const parsed = UserSchema.safeParse(req.body);
        if (!parsed.success) {
            return this.httpResponse.BadRequest(res, parsed.error);
        }
        next();
    }
};