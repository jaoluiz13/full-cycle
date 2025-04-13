import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe('category unit tests', () => {
    test('should create a new category', () => {

        let category = new Category({
            name: 'movie'
        });

        expect(category.category_id).toBeInstanceOf(Uuid);
        expect(category.name).toBe('movie');
        expect(category.description).toBeNull();
        expect(category.is_active).toBeTruthy();
        expect(category.created_at).toBeInstanceOf(Date);

        category = new Category({
            name: 'movie',
            description: 'test',
            is_active: false,
            created_at: new Date()
        });

        expect(category.category_id).toBeInstanceOf(Uuid);
        expect(category.name).toBe('movie');
        expect(category.description).toBe('test');
        expect(category.is_active).toBeFalsy();
        expect(category.created_at).toBeInstanceOf(Date);
    });

    test("should be able to change name", () => {
        let category = new Category({
            name: 'movie'
        });

        expect(category.name).toBe('movie');

        const newName = 'updated name';

        category.changeName(newName);
        expect(category.name).toBe(newName);
    });

    test("should be able to change description", () => {

        let category = new Category({
            name: 'movie',
            description: 'test'
        });

        expect(category.description).toBe('test');

        const newDescription = 'updated description';

        category.changeDescription(newDescription);
        expect(category.description).toBe(newDescription);

    });

    test("should be able to  activate a category", () => {

        let category = new Category({
            name: 'movie',
            description: 'test',
            is_active: false
        });

        expect(category.is_active).toBeFalsy();

        category.activate();
        expect(category.is_active).toBeTruthy();

    });

    test("should be able to  deactivate a category", () => {

        let category = new Category({
            name: 'movie',
            description: 'test',
            is_active: true
        });

        expect(category.is_active).toBeTruthy();

        category.deactivate();
        expect(category.is_active).toBeFalsy();

    });
})