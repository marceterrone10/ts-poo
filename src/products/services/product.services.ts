import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { ProductDTO } from '../dto/product.dto';
import { ProductEntity} from '../entities/product.entity';

export class ProductService extends BaseService<ProductEntity> {
    constructor() {
        super(ProductEntity);
    }

    async findAllProducts(): Promise<ProductEntity[]> {
        const repo = await this.execRepository;
        return repo.find();
    }

    async findProductById(id: string): Promise<ProductEntity | null> {
        const repo = await this.execRepository;
        return repo.findOneBy({ id });
    }

    async createProduct(body: ProductDTO): Promise<ProductEntity> {
        const repo = await this.execRepository;
        const product = await repo.save(body as any);
        return product as ProductEntity;
    }

    async deleteProduct(id: string): Promise<DeleteResult> {
        const repo = await this.execRepository;
        return repo.delete(id);
    }

    async updateProduct(id: string, body: ProductDTO): Promise<UpdateResult> {
        const repo = await this.execRepository;
        return repo.update(id, body as any);
    }
}
