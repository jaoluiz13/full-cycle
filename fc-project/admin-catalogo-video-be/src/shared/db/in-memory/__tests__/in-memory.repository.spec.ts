import { Entity } from "../../../domain/entity";
import { NotFoundError } from "../../../domain/errors/not-found.error";
import { Uuid } from "../../../domain/value-objects/uuid.vo";
import { InMemoryRepository } from "../in-memory.repository";


type StubEntityConstructor = {
    entity_id?: Uuid;
    name: string;
    price: number;
}

class StubEntity extends Entity {
    entity_id: Uuid;
    name: string;
    price: number;

    constructor(props: StubEntityConstructor) {
        super();
        this.entity_id = props.entity_id;
        this.name = props.name;
        this.price = props.price;
    }

    toJSON() {
        return {
            entity_id: this.entity_id.id,
            name: this.name,
            price: this.price
        }
    }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
    getEntity(): new (...args: any[]) => StubEntity {
        return StubEntity;
    }
}

describe("In memory repository unit tests", () => {
    let repo: StubInMemoryRepository;

    beforeEach(() => {
        repo = new StubInMemoryRepository();
    });

    test("should be able to insert a new entity", async () => {
        const entity = new StubEntity({
            entity_id: new Uuid(),
            name: 'Test',
            price: 100
        });

        await repo.insert(entity);
        expect(repo.items.length).toBe(1);
        expect(await repo.findById(entity.entity_id)).toBe(entity);
    });


    test("should be able to insert entities in batch", async () => {
        const entity1 = new StubEntity({
            entity_id: new Uuid(),
            name: 'Test',
            price: 100
        });

        const entity2 = new StubEntity({
            entity_id: new Uuid(),
            name: 'Test',
            price: 100
        });

        await repo.batchInsert([entity1, entity2]);
        expect(repo.items.length).toBe(2);
    });


    test("should be able to find an entity", async () => {
        const entity = new StubEntity({
            entity_id: new Uuid(),
            name: 'Test',
            price: 100
        });

        await repo.insert(entity);
        expect(await repo.findById(entity.entity_id)).toBe(entity);
    });

    test("should be able to retrieve all entities", async () => {
        const entity1 = new StubEntity({
            entity_id: new Uuid(),
            name: 'Test',
            price: 100
        });

        const entity2 = new StubEntity({
            entity_id: new Uuid(),
            name: 'Test',
            price: 100
        });

        await repo.batchInsert([entity1, entity2]);
        expect(repo.items.length).toBe(2);
        expect(await repo.findAll()).toHaveLength(2);
    });


    test("should be able to update an entity", async () => {
        const oldEntity = new StubEntity({
            entity_id: new Uuid(),
            name: 'Test',
            price: 100
        });

        const newEntity = new StubEntity({
            entity_id: oldEntity.entity_id,
            name: 'Test updated',
            price: 200
        });

        await repo.insert(oldEntity);
        await repo.update(newEntity);

        expect((await repo.findById(newEntity.entity_id)).name).toBe('Test updated');
        expect((await repo.findById(newEntity.entity_id)).price).toBe(200);
    });

    test("should be able to remove an entity", async () => {
        const entity = new StubEntity({
            entity_id: new Uuid(),
            name: 'Test',
            price: 100
        });

        await repo.insert(entity);
        await repo.delete(entity.entity_id);
        expect(repo.items.length).toBe(0);
    });


    test("should throw an error when entity was not found", async () => {
        const entity = new StubEntity({
            name: 'Test',
            price: 100
        });

        await (expect(repo.update(entity)).rejects.toThrow(new NotFoundError(entity.entity_id, StubEntity)));
    });


});