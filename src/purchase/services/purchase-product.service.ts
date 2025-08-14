import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { PurchaseProductsDTO } from "../dto/purchase-products.dto";
import { PurchaseProductsEntity } from "../entities/purchases-products.entity";

export class PurchaseProductService extends BaseService<PurchaseProductsEntity> {
    constructor() {
        super(PurchaseProductsEntity);
    }

    async findAll(): Promise<PurchaseProductsEntity[]> {
        const repo = await this.execRepository;
        return repo.find();
    }

    async findById(id: string): Promise<PurchaseProductsEntity | null> {
        const repo = await this.execRepository;
        return repo.findOneBy({ id });
    }

    async create(body: PurchaseProductsDTO): Promise<PurchaseProductsEntity> {
        const repo = await this.execRepository;
        const entity = repo.save(body as any);
        return entity;
    }

    async update(id: string, body: PurchaseProductsDTO): Promise<UpdateResult> {
        const repo = await this.execRepository;
        return repo.update(id, body)
    }

    async delete(id: string): Promise<DeleteResult> {
        const repo = await this.execRepository;
        return repo.delete(id);
    }
}