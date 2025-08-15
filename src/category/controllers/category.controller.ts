import { Request, Response } from 'express';
import { CategoryService } from '../services/category.services';
import { HttpResponse } from '../../shared/response/http.response';
import { DeleteResult, UpdateResult } from 'typeorm';


export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService = new CategoryService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){}

    async getCategory(req: Request, res: Response) {
        try {
            const data = await this.categoryService.findAllCategories();
            if(data.length === 0){
                return this.httpResponse.NotFound(res, "No categories found");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error retrieving categories:", error);
            return this.httpResponse.InternalServerError(res, "Error retrieving categories");
        }
    }

    async getCategoryById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.categoryService.findCategoryById(id);
            if(!data){
                return this.httpResponse.NotFound(res, "Category not found");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error retrieving category:", error);
            return this.httpResponse.InternalServerError(res, "Error retrieving category");
        }
    }

    async getCategoryWithProductsById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.categoryService.findCategoryWithProducts(id);
            if(!data){
                return this.httpResponse.NotFound(res, "Category not found");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error retrieving category:", error);
            return this.httpResponse.InternalServerError(res, "Error retrieving category");
        }
    }

    async createCategory(req: Request, res: Response) {
        try {
            const body = req.body;
            const data = await this.categoryService.createCategory(body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error creating category:", error);
            return this.httpResponse.InternalServerError(res, "Error creating category");
        }
    }

    async updateCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const body = req.body;
            const data: UpdateResult = await this.categoryService.updateCategory(id, body);
            if(!data.affected){
                return this.httpResponse.NotFound(res, "Error updating category");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error updating category:", error);
            return this.httpResponse.InternalServerError(res, "Error updating category");
        }
    }

    async deleteCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.categoryService.deleteCategory(id);
            if(!data.affected){
                return this.httpResponse.NotFound(res, "Error deleting category");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error deleting category:", error);
            return this.httpResponse.InternalServerError(res, "Error deleting category");
        }
    }
}