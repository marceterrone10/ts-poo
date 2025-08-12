import { Column, Entity, OneToMany} from "typeorm";
import { BaseEntity } from '../../config/base.entity';
import { ProductEntity } from "../../products/entities/product.entity";
@Entity({name:'categories'})
export class CategoryEntity extends BaseEntity {
    @Column()
    category_name!: string;

    @OneToMany(() => ProductEntity, (product) => product.category)
    products!: ProductEntity[];


    /*
    @OneToMany -> una categoria puede tener muchos productos

    Primer parametro () => ProductEntity le dice a TypeORM con que entidad se esta relacionando.

    El segundo param (product) => product.category es el lado inverso de la relación:
    product es una instancia de ProductEntity.

    .category es el @ManyToOne que está declarado dentro de ProductEntity y apunta de vuelta a la categoría.
    */
}; 