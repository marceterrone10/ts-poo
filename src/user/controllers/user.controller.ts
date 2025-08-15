import { Request, Response } from 'express';
import { UserService } from '../services/user.services';
import { HttpResponse } from '../../shared/response/http.response';
import { DeleteResult, UpdateResult } from 'typeorm';


export class UserController {
    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){}

    async getUser(req: Request, res: Response) {
        try {
            const data = await this.userService.findAllUsers();
            if(data.length === 0){
                return this.httpResponse.NotFound(res, "No users found");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error retrieving user:", error);
            return this.httpResponse.InternalServerError(res, "Error retrieving user");
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.userService.findUserById(id);
            if(!data){
                return this.httpResponse.NotFound(res, "User not found");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error retrieving user:", error);
            return this.httpResponse.InternalServerError(res, "Error retrieving user");
        }
    }

    async getUserWithRelationById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.userService.findUserWithRelation(id);
            if(!data){
                return this.httpResponse.NotFound(res, "User not found");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error retrieving user:", error);
            return this.httpResponse.InternalServerError(res, "Error retrieving user");
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const body = req.body;
            const data = await this.userService.createUser(body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error retrieving user:", error);
            return this.httpResponse.InternalServerError(res, "Error retrieving user");
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const body = req.body;
            const data: UpdateResult = await this.userService.updateUser(id, body);
            if(!data.affected){
                return this.httpResponse.NotFound(res, "Error updating user");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error updating user:", error);
            return this.httpResponse.InternalServerError(res, "Error retrieving user");
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.userService.deleteUser(id);
            if(!data.affected){
                return this.httpResponse.NotFound(res, "Error deleting user");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error deleting user:", error);
            return this.httpResponse.InternalServerError(res, "Error retrieving user");
        }
    }
}