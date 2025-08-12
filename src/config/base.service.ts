import { BaseEntity, EntityTarget, Repository } from 'typeorm';
import { ConfigServer } from './config';

export class BaseService<T extends BaseEntity> extends ConfigServer {
    public execRepository: Promise<Repository<T>>;

    constructor(private getEntity: EntityTarget<T>) {
        super();
        this.execRepository = this.initRepository(getEntity);
    }

    private async initRepository(e: EntityTarget<T>): Promise<Repository<T>> {
        const ds = await this.dbConnect();
        return ds.getRepository(e);
    }
}

/*
<T extends BaseEntity> T sera de cualquier entidad que extienda de BaseEntity, por ej: UserEntity, ProductEntity, etc.

extends ConfigServer hereda la clase para poder acceder a dbConnect() y conectar a la base de datos

execRepository guarda una promise que da el repositorio ORM para la entidad T

constructor recibe una entidad por ej: UserEntity
llama a super() para inicializar lo que haya en ConfigServer (dbConnect())
se inicializa execRepository usando this.initRepository(getEntity) -> se crea el repositorio para esa entidad

metodo initRepository: se pasa la entidad de parametro, espera la conexion a la DB con this.dbConnect()
getConn.getRepository(e); devuelve un repo de typeORM para esa entidad

*/