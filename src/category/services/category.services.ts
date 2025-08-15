import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryDTO } from '../dto/category.dto';

export class CategoryService extends BaseService<CategoryEntity> {
    constructor() {
        super(CategoryEntity);
    }

    async findAllCategories(): Promise<CategoryEntity[]> {
        const repo = await this.execRepository;
        return repo.find();
    }

    async findCategoryById(id: string): Promise<CategoryEntity | null> {
        const repo = await this.execRepository;
        return repo.findOneBy({ id });
    }

    async findCategoryWithProducts(id: string): Promise<CategoryEntity | null> {
        return (await this.execRepository)
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.products', 'products')
        .where({ id })
        .getOne();
    }

    async createCategory(body: CategoryDTO): Promise<CategoryEntity> {
        const repo = await this.execRepository;
        const category = await repo.save(body as any);
        return category as CategoryEntity;
    }

    async deleteCategory(id: string): Promise<DeleteResult> {
        const repo = await this.execRepository;
        return repo.delete(id);
    }

    async updateCategory(id: string, body: CategoryDTO): Promise<UpdateResult> {
        const repo = await this.execRepository;
        return repo.update(id, body as any);
    }
}
