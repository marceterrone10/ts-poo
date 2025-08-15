import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { PurchaseProductsDTO } from "../dto/purchase-products.dto";
import { PurchaseProductsEntity } from "../entities/purchases-products.entity";
import { ProductService } from "../../products/services/product.services";

export class PurchaseProductService extends BaseService<PurchaseProductsEntity> {
    constructor(
        private readonly productService: ProductService = new ProductService()
    ) {
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
        const newPP = (await this.execRepository).create(body);
        const prod = await this.productService.findProductById(newPP.product.id);
        newPP.total_price = prod!.price * newPP.quantity_product;
        return (await this.execRepository).save(newPP);
        /*
        .create() es una funcion de typeORM, lo que hace en este codigo es instanciar PurchaseProductEntity usando los datos del body (PurchaseProductDTO)
        con la const prod accedemos al producto correspondiente almacenado en newPP
        Para posteriormente calcular su precio total
        En si la logica es que al crear un nuevo producto en la compra, necesitamos obtener el precio del producto original para poder calcular el precio total de la compra.
        */ 
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