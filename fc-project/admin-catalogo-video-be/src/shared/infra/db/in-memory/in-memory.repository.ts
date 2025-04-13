import { Entity } from "../../../domain/entity";
import { NotFoundError } from "../../../domain/errors/not-found.error";
import { IRepository } from "../../../domain/repository/repository.interface";
import { ValueObject } from "../../../domain/value-object";

export class InMemoryRepository<E extends Entity, EntityId extends ValueObject> implements IRepository<E, EntityId> {

    items: E[] = [];

    async insert(entity: E): Promise<void> {
        this.items.push(entity);
    }
    async update(entity: E): Promise<void> {
        const index = this.items.findIndex((item) => item.entity_id.equals(entity.entity_id));
        if (index === -1) {
            throw new NotFoundError(entity.entity_id, this.getEntity());
        }

        this.items[index] = entity;
    }
    async delete(entity_id: EntityId): Promise<void> {

        this.items.splice(this._get(entity_id), 1);
    }
    async batchInsert(entities: E[]): Promise<void> {
        this.items.push(...entities);
    }
    async findById(entity_id: EntityId): Promise<E | null> {
        return this.items[this._get(entity_id)];
    }
    async findAll(): Promise<E[] | null> {
        return this.items;
    }
    getEntity(): new (...args: any[]) => any {
        throw new Error("Method not implemented.");
    }

    protected _get(entity_id: EntityId) {

        const index = this.items.findIndex((item) => item.entity_id.equals(entity_id));
        if (index === -1) {
            throw new NotFoundError(entity_id, this.getEntity());
        }

        return index;
    }

}