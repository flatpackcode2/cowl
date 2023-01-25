import { Board } from "../../src/services/board"
describe('Board Service Test Suite', () => {
    test('fruit position should not overlap with snake position', () => {
        const board = new Board();
        const snakePos = { x: 2, y: 2 }
        const fruitPos = board.generateNewFruitPosition({
            w: 2,
            h: 2,
            snake: {
                ...snakePos,
                velX: 0,
                velY: 1
            }
        })
        expect(snakePos).not.toEqual(fruitPos);
    })
})