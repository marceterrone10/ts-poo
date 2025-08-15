import { Request, Response } from 'express';
import { CustomerService } from '../services/customer.services';
import { HttpResponse } from '../../shared/response/http.response';
import { DeleteResult, UpdateResult } from 'typeorm';


export class CustomerController {
    constructor(
        private readonly customerService: CustomerService = new CustomerService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){}

    async getCustomer(req: Request, res: Response) {
        try {
            const data = await this.customerService.findAllCustomers();
            if(data.length === 0){
                return this.httpResponse.NotFound(res, "No customers found");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error retrieving customers:", error);
            return this.httpResponse.InternalServerError(res, "Error retrieving customers");
        }
    }

    async getCustomerById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.customerService.findCustomerById(id);
            if(!data){
                return this.httpResponse.NotFound(res, "Customer not found");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error retrieving customer:", error);
            return this.httpResponse.InternalServerError(res, "Error retrieving customer");
        }
    }

    async getCustomerWithRelationById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.customerService.findCustomerWithPurchases(id);
            if(!data){
                return this.httpResponse.NotFound(res, "Customer not found");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error retrieving customer:", error);
            return this.httpResponse.InternalServerError(res, "Error retrieving customer");
        }
    }

    async createCustomer(req: Request, res: Response) {
        try {
            const body = req.body;
            const data = await this.customerService.createCustomer(body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error creating customer:", error);
            return this.httpResponse.InternalServerError(res, "Error creating customer");
        }
    }

    async updateCustomer(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const body = req.body;
            const data: UpdateResult = await this.customerService.updateCustomer(id, body);
            if(!data.affected){
                return this.httpResponse.NotFound(res, "Error updating customer");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error updating customer:", error);
            return this.httpResponse.InternalServerError(res, "Error retrieving customer");
        }
    }

    async deleteCustomer(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.customerService.deleteCustomer(id);
            if(!data.affected){
                return this.httpResponse.NotFound(res, "Error deleting customer");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error deleting customer:", error);
            return this.httpResponse.InternalServerError(res, "Error retrieving customer");
        }
    }
}