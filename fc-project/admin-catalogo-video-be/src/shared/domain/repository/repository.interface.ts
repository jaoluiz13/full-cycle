import { Entity } from "../entity";
import { ValueObject } from "../value-object";

export interface IRepository<E extends Entity, EntityId extends ValueObject> {
    insert(entity: E): Promise<void>;
    update(entity: E): Promise<void>;
    delete(entity_id: EntityId): Promise<void>;
    batchInsert(entities: E[]): Promise<void>;

    findById(entity_id: EntityId): Promise<E | null>;
    findAll(): Promise<E[] | null>;

    getEntity(): new (...args: any[]) => E;
}