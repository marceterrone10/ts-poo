import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { PurchaseStatus } from "../entities/purchase.status";
import { CustomerEntity } from "../../customers/entities/customer.entity";

export class PurchaseDTO extends BaseDTO {
    @IsNotEmpty()
    status!: PurchaseStatus

    @IsNotEmpty()
    payment_method!: string;

    @IsNotEmpty()
    customer!: CustomerEntity;
};