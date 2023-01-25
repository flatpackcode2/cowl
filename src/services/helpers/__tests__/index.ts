import { generateRandomPosition, getLastTick, mapError, generateErrorObject } from '../index'

describe('Test for helper functions', () => {

    test('generateRandomPosition', () => {
        const dimension = 10
        const randomPosition = generateRandomPosition(dimension);
        expect(randomPosition).toBeLessThanOrEqual(dimension);
    })

    test('getLastTick', () => {
        const ticks = [
            { velX: 0, velY: 0 },
            { velX: 1, velY: 0 },
            { velX: -1, velY: 0 },
            { velX: 0, velY: -1 }
        ]
        const lastTick = getLastTick(ticks);
        expect(lastTick).toEqual(ticks[3]);
    })

    test('mapError', () => {
        const testOne = {
            type: 'string.pattern.base',
            key: 'one',
            value: '1',
        };
        const errorOne = 'Invalid value of 1 provided for one. Please make sure it is an integer greater than 1';

        const testTwo = {
            type: 'any.required',
            key: 'two',
            value: '2',
        };
        const errorTwo = 'Missing value two';

        const testThree = {
            type: 'object.unknown',
            key: 'three',
            value: '3',
        };
        const errorThree = 'Unknown parameter three provided';

        const testFour = {
            type: 'number.base',
            key: 'four',
            value: 4.1,
        };
        const errorFour = 'Invalid value of 4.1 provided for four. Please make sure it is an integer';

        const testFive = {
            type: 'default',
            key: 'five',
            value: '5',
        };
        const errorFive = `Invalid value provided for five`
        expect(mapError(testOne.type, testOne.key, testOne.value)).toEqual(errorOne);
        expect(mapError(testTwo.type, testTwo.key, testTwo.value)).toEqual(errorTwo);
        expect(mapError(testThree.type, testThree.key, testThree.value)).toEqual(errorThree);
        expect(mapError(testFour.type, testFour.key, testFour.value)).toEqual(errorFour);
        expect(mapError(testFive.type, testFive.key, testFive.value)).toEqual(errorFive);
    })

    test('generateErrorObject', () => {
        const errorArray = [{
            type: 'string.pattern.base',
            context: {
                key: 'one',
                value: '1',
            }
        }, {
            type: 'any.required',
            context: {
                key: 'two',
                value: '2',
            }
        }]
        const errorOne = 'Invalid value of 1 provided for one. Please make sure it is an integer greater than 1';
        const errorTwo = 'Missing value two';
        expect(generateErrorObject(errorArray)).toEqual(
            {
                one: errorOne,
                two: errorTwo
            }
        );
    })
})