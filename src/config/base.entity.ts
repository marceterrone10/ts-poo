import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity as TypeORMBaseEntity } from "typeorm";

export abstract class BaseEntity extends TypeORMBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp'
    })
    createdAt!: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp'
    })
    updatedAt!: Date;
}