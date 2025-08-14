import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { PurchaseDTO } from "../dto/purchase.dto";
import { PurchaseEntity } from "../entities/purchase.entity";

export class PurchaseService extends BaseService<PurchaseEntity> {
    constructor() {
        super(PurchaseEntity); //getEntity
    }

    async findAllPurchases(): Promise<PurchaseEntity[]> {
        const repo = await this.execRepository;
        return repo.find();
    }

    async findPurchaseById(id: string): Promise<PurchaseEntity | null> {
        const repo = await this.execRepository;
        return repo.findOneBy({ id });
    }

    async createPurchase(body: PurchaseDTO): Promise<PurchaseEntity> {
        const repo = await this.execRepository;
        const purchase = await repo.save(body as any);
        return purchase as PurchaseEntity;
    }

    async updatePurchase(id: string, body: PurchaseDTO): Promise<UpdateResult> {
        const repo = await this.execRepository;
        return repo.update(id, body as any);
    }

    async deletePurchase(id: string): Promise<DeleteResult> {
        const repo = await this.execRepository;
        return repo.delete(id)
    }   

}