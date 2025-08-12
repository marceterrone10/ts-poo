import { Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import { BaseEntity } from '../../config/base.entity';
import { CategoryEntity } from "../../category/entities/category.entity"
import { PurchaseProductsEntity } from "../../purchase/entities/purchases-products.entity";

@Entity({name:'products'})
export class ProductEntity extends BaseEntity {
    @Column()
    product_name!: string;

    @Column()
    description!: string;

    @Column()
    price!: number;

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({ name: "category_id" })
    category!: CategoryEntity;
    /*@ManyToOne → Significa que muchos productos (ProductEntity) pueden estar asociados a una sola categoría (CategoryEntity).

    El primer parámetro () => CategoryEntity le dice a TypeORM con qué entidad se está relacionando.

    El segundo parámetro (category) => category.products es el lado inverso de la relación:
    category es una instancia de CategoryEntity.

    .products es el @OneToMany que está declarado dentro de CategoryEntity y apunta de vuelta a los productos.*/ 

    @OneToMany(() => PurchaseProductsEntity, (purchaseProduct) => purchaseProduct.product)
    purchaseProduct!: PurchaseProductsEntity[];
}; 