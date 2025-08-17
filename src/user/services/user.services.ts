import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { UserDTO } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';
import { HashPassword } from '../../utils/hash/password.hash';

export class UserService extends BaseService<UserEntity> {
    constructor(
        private readonly hash: HashPassword = new HashPassword(10)
    ) {
        super(UserEntity);
    }

    async findAllUsers(): Promise<UserEntity[]> {
        const repo = await this.execRepository;
        return repo.find();
    }

    async findUserById(id: string): Promise<UserEntity | null> {
        const repo = await this.execRepository;
        return repo.findOneBy({ id });
    }

    async findUserWithRelation(id: string): Promise<UserEntity | null> {
        return (await this.execRepository).createQueryBuilder('user')
        .leftJoinAndSelect('user.customer','customer')
        .where({ id })
        .getOne()
    };

    async createUser(body: UserDTO): Promise<UserEntity> {
        const repo = await this.execRepository;
        body.password = await this.hash.hashing(body.password);
        const user = await repo.save(body as any);
        return user as UserEntity;
    }

    async deleteUser(id: string): Promise<DeleteResult> {
        const repo = await this.execRepository;
        return repo.delete(id);
    }

    async updateUser(id: string, body: UserDTO): Promise<UpdateResult> {
        const repo = await this.execRepository;
        return repo.update(id, body as any);
    }
}
