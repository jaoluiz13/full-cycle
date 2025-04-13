import { ValueObject } from "../value-object";

class StringValueObject extends ValueObject {
    constructor(readonly value: string) {
        super();
    }
}

describe('Value object unit tests', () => {
    test('should be able to compare two equal value objects', () => {
        const valueObj1 = new StringValueObject('test');
        const valueObj2 = new StringValueObject('test');

        expect(valueObj1.equals(valueObj2)).toBeTruthy();
    });

    test('should be able to compare two different value objects', () => {
        const valueObj1 = new StringValueObject('test');
        const valueObj2 = new StringValueObject('test2');
        expect(valueObj1.equals(valueObj2)).toBeFalsy();
    });
});