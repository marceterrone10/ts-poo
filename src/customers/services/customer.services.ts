import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { CustomerDTO } from '../dto/customer.dto';
import { CustomerEntity } from '../entities/customer.entity';

export class CustomerService extends BaseService<CustomerEntity> {
    constructor() {
        super(CustomerEntity);
    }

    async findAllCustomers(): Promise<CustomerEntity[]> {
        const repo = await this.execRepository;
        return repo.find();
    }

    async findCustomerById(id: string): Promise<CustomerEntity | null> {
        const repo = await this.execRepository;
        return repo.findOneBy({ id });
    }

    async findCustomerWithPurchases(id: string): Promise<CustomerEntity | null>{
        return (await this.execRepository)
        .createQueryBuilder('customer')
        .leftJoinAndSelect('customer.purchases','purchases')
        .where({ id })
        .getOne();
    }

    async createCustomer(body: CustomerDTO): Promise<CustomerEntity> {
        const repo = await this.execRepository;
        const customer = await repo.save(body as any);
        return customer as CustomerEntity;
    }

    async deleteCustomer(id: string): Promise<DeleteResult> {
        const repo = await this.execRepository;
        return repo.delete(id);
    }

    async updateCustomer(id: string, body: CustomerDTO): Promise<UpdateResult> {
        const repo = await this.execRepository;
        return repo.update(id, body as any);
    }
}
