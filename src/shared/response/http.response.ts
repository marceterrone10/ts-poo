import { Response } from "express";

enum HttpStatus {
    OK = 200,
    NOT_FOUND = 404,
    UNAUTHORIZED = 401,
    BAD_REQUEST = 400,
    FORBIDDEN = 403,
    INTERNAL_SERVER_ERROR = 500
};

export class HttpResponse {
    Ok(res: Response, data: any): Response{
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            statusMsg: "Success",
            data: data
        })
    };

    NotFound(res: Response, data: any): Response{
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            statusMsg: "Not Found",
            error: data
        })
    };

    Unauthorized(res: Response, data: any): Response{
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            statusMsg: "Unauthorized",
            error: data
        })
    };

    BadRequest(res: Response, data: any): Response{
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            statusMsg: "Bad Request",
            error: data
        })
    };

    Forbidden(res: Response, data: any): Response{
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            statusMsg: "Forbidden",
            error: data
        })
    };

    InternalServerError(res: Response, data: any){
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            statusMsg: "Internal Server Error",
            error: data
        })
    };

}