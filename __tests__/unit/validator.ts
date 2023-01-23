import { Validator } from "../../src/services/validator";
import { Board } from "../../src/types";

describe('validation test', () => {

    test('if moveset is valid, should increment score and move snake to fruit position and randomly generate new fruit location', () => {
        const validData: Board.Moveset = {
            gameId: 'testId',
            width: 250,
            height: 250,
            score: 0,
            fruit: {
                x: 5,
                y: 10
            },
            snake: {
                x: 0,
                y: 0,
                velX: 1,
                velY: 0
            },
            ticks: [
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
            ]
        }
        const val = new Validator();
        const isValid = val.validate(validData);
        expect(isValid).toBeTruthy()
    });

    test('if moveset is invalid ie snake and fruit do not coincide, validate should return false', () => {
        const invalidData = {
            gameId: 'testId',
            width: 250,
            height: 250,
            score: 0,
            fruit: {
                x: 5,
                y: 10
            },
            snake: {
                x: 0,
                y: 0,
                velX: 1,
                velY: 0
            },
            ticks: [
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 0, velY: 0 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
            ]
        };
        const val = new Validator();
        const isValid = val.validate(invalidData);
        expect(isValid).toBeFalsy();
    });

    test('should not allow abrupt reverse direction in horizontal direction', () => {
        const invalidData = {
            gameId: 'testId',
            width: 250,
            height: 250,
            score: 0,
            fruit: {
                x: 5,
                y: 10
            },
            snake: {
                x: 0,
                y: 0,
                velX: 1,
                velY: 0
            },
            ticks: [
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: -1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
            ]
        };
        const val = new Validator();
        const isValid = val.validate(invalidData);
        expect(isValid).toBeFalsy();
    });

    test('should not allow abrupt reverse direction in vertical direction', () => {
        const invalidData = {
            gameId: 'testId',
            width: 250,
            height: 250,
            score: 0,
            fruit: {
                x: 5,
                y: 10
            },
            snake: {
                x: 0,
                y: 0,
                velX: 1,
                velY: 0
            },
            ticks: [
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: -1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
            ]
        };
        const val = new Validator();
        const isValid = val.validate(invalidData);
        expect(isValid).toBeFalsy();
    });
    test('should not allow to cross horizontal board borders -0', () => {
        const invalidData = {
            gameId: 'testId',
            width: 250,
            height: 250,
            score: 0,
            fruit: {
                x: 5,
                y: 10
            },
            snake: {
                x: 0,
                y: 0,
                velX: 1,
                velY: 0
            },
            ticks: [
                { velX: -1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
            ]
        };
        const val = new Validator();
        const isValid = val.validate(invalidData);
        expect(isValid).toBeFalsy();
    });

    test('should not allow to cross horizontal board borders +width', () => {
        const invalidData = {
            gameId: 'testId',
            width: 5,
            height: 10,
            score: 0,
            fruit: {
                x: 5,
                y: 10
            },
            snake: {
                x: 0,
                y: 0,
                velX: 1,
                velY: 0
            },
            ticks: [
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: -1, velY: 0 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
            ]
        };
        const val = new Validator();
        const isValid = val.validate(invalidData);
        expect(isValid).toBeFalsy();
    });
    test('should not allow to cross vertical board borders -0', () => {
        const invalidData = {
            gameId: 'testId',
            width: 5,
            height: 10,
            score: 0,
            fruit: {
                x: 5,
                y: 10
            },
            snake: {
                x: 0,
                y: 0,
                velX: 1,
                velY: 0
            },
            ticks: [
                { velX: 0, velY: -1 },
                { velX: 0, velY: 1 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
            ]
        };
        const val = new Validator();
        const isValid = val.validate(invalidData);
        expect(isValid).toBeFalsy();
    });
    test('should not allow to cross vertical board borders +height', () => {
        const invalidData = {
            gameId: 'testId',
            width: 5,
            height: 10,
            score: 0,
            fruit: {
                x: 5,
                y: 10
            },
            snake: {
                x: 0,
                y: 0,
                velX: 1,
                velY: 0
            },
            ticks: [
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: -1 },
            ]
        };
        const val = new Validator();
        const isValid = val.validate(invalidData);
        expect(isValid).toBeFalsy();
    });
    
    test('velX values should be -1, 0 or 1', () => {
        const invalidData = {
            gameId: 'testId',
            width: 5,
            height: 10,
            score: 0,
            fruit: {
                x: 5,
                y: 10
            },
            snake: {
                x: 0,
                y: 0,
                velX: 1,
                velY: 0
            },
            ticks: [
                { velX: -1, velY: 0 },
                { velX: 0, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 2, velY: 0 },
            ]
        };
        const val = new Validator();
        const isValid = val.validate(invalidData);
        expect(isValid).toBeFalsy();
    });

    test('velY values should be -1, 0 or 1', () => {
        const invalidData = {
            gameId: 'testId',
            width: 5,
            height: 10,
            score: 0,
            fruit: {
                x: 5,
                y: 10
            },
            snake: {
                x: 0,
                y: 0,
                velX: 1,
                velY: 0
            },
            ticks: [
                { velX: 0, velY: -1 },
                { velX: 0, velY: 0 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 2 },
            ]
        };
        const val = new Validator();
        const isValid = val.validate(invalidData);
        expect(isValid).toBeFalsy();
    });


})