import { Request, Response } from 'express';
import { UserService } from '../services/user.services';


export class UserController {
    constructor(private readonly userService: UserService = new UserService()){

    }
    async getUser(req: Request, res: Response) {
        try {
            const data = await this.userService.findAllUsers();
            res.status(200).json({
                data
            })
        } catch (error) {
            console.error("Error retrieving user:", error);
            res.status(500).json({
                message: "Error retrieving user"
            });
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.userService.findUserById(id);
            res.status(200).json({
                data
            })
        } catch (error) {
            console.error("Error retrieving user:", error);
            res.status(500).json({
                message: "Error retrieving user"
            });
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const body = req.body;
            const data = await this.userService.createUser(body);
            res.status(201).json({
                "User": data
            });
        } catch (error) {
            console.error("Error retrieving user:", error);
            res.status(500).json({
                message: "Error retrieving user"
            });    
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const body = req.body;
            const data = await this.userService.updateUser(id, body);
            res.status(200).json({
                "User": data
            });
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({
                message: "Error updating user"
            });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.userService.deleteUser(id);
            res.status(200).json({
                message: "User deleted successfully"
            });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({
                message: "Error deleting user"
            });
        }
    }
}