import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from '../../config/base.entity';
import { CustomerEntity } from "../../customers/entities/customer.entity";

@Entity({name:'user'})
export class UserEntity extends BaseEntity {
    @Column()
    username!: string;

    @Column()
    name!: string;

    @Column()
    lastname!: string;

    @Column()
    city!: string;

    @Column()
    province!: number;

    @OneToOne(() => CustomerEntity, (customer) => customer.user)
    customer!: CustomerEntity;
};