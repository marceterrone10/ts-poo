import { Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import { BaseEntity } from '../../config/base.entity';
import { CustomerEntity } from "../../customers/entities/customer.entity";
import { PurchaseStatus } from "./purchase.status";
import { PurchaseProductsEntity } from "../../purchase/entities/purchases-products.entity";

@Entity({name:'purchase'})
export class PurchaseEntity extends BaseEntity {
    @Column({
        type: "enum",
        enum: PurchaseStatus,
        default: PurchaseStatus.PENDING
    })
    status!: PurchaseStatus;

    @Column()
    payment_method!: string;

    @ManyToOne(() => CustomerEntity, (customer) => customer.purchases)
    @JoinColumn({ name: "customer_id" })
    customer!: CustomerEntity;

    @OneToMany(() => PurchaseProductsEntity, (purchaseProduct) => purchaseProduct.purchase)
    purchaseProduct!: PurchaseProductsEntity[];    
}; 