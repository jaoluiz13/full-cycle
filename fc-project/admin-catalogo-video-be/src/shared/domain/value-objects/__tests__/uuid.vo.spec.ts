import { InvalidUuidError, Uuid } from "../uuid.vo";

describe('Uuid unit tests', () => {

    const validateSpy = jest.spyOn(Uuid.prototype as any, "validate");

    test('should be able to throw an error when uuid is invalid', () => {
        expect(() => {
            new Uuid("Invalid");
        }).toThrow(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalledTimes(1);

    });

    test('should be able to create a valid uuid', () => {

        const uuid = new Uuid();
        expect(uuid).toBeDefined();
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test('should be able to accept a valid uuid', () => {

        let uuid = new Uuid('00827c0a-ff1d-429f-afce-057a9a28fe0c');
        expect(uuid).toBeDefined();
        expect(uuid.id).toBe('00827c0a-ff1d-429f-afce-057a9a28fe0c');

        expect(validateSpy).toHaveBeenCalledTimes(1);
    });
})