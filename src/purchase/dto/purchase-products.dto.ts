import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { PurchaseEntity } from "../entities/purchase.entity";
import { ProductEntity } from "../../products/entities/product.entity";

export class PurchaseProductsDTO extends BaseDTO{
    @IsNotEmpty()
    quantity_product!: number;

    @IsNotEmpty()
    total_price!: number;

    @IsNotEmpty()
    purchase?: PurchaseEntity;

    @IsNotEmpty()
    product?: ProductEntity;
    
};