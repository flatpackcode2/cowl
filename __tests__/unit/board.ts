import { Board } from "../../src/services/board"
describe('Board Service Test Suite', () => {
    test('Should create new board', () => {
        const board = new Board();
        const game = board.create({w:10,h:10});
        console.log('game', game);
        expect(game).toHaveProperty('gameId');
        expect(game).toHaveProperty('width');
        expect(game).toHaveProperty('height');
        expect(game).toHaveProperty('fruit');
        expect(game).toHaveProperty('snake');
        expect(game).toHaveProperty('score');
        expect(game.snake.x).toEqual(0);
        expect(game.snake.y).toEqual(0);
        expect(game.snake.velX).toEqual(1);
        expect(game.snake.velY).toEqual(0);
    });

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