import { Column, Entity, OneToOne } from "typeorm";
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../config/base.entity';
import { CustomerEntity } from "../../customers/entities/customer.entity";
import { RoleType } from "../dto/user.dto";

@Entity({name:'user'})
export class UserEntity extends BaseEntity {
    @Column()
    username!: string;

    @Column()
    name!: string;

    @Column()
    lastname!: string;

    @Column()
    email!: string;

    @Exclude()
    @Column()
    password!: string;

    @Column()
    city!: string;

    @Column()
    province!: string;

    @Column({type: 'enum', enum: RoleType, nullable: false})
    role!: RoleType;

    @OneToOne(() => CustomerEntity, (customer) => customer.user)
    customer!: CustomerEntity;
};