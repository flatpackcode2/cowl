import { Board } from "../types";
import { Board as BoardService } from "./board";
import _ from 'lodash';
import { ERROR_CODE, ERROR_MESSAGE } from "../constants";
import { getLastTick } from "./helpers";
export class Validator {

    public validate = (state: {
        snake: Board.Snake,
        fruit: Board.Fruit,
        ticks: Board.VelocityVector[],
        height: number,
        width: number
    }): {
        valid: Boolean;
        error?: {
            code: number,
            message: string
        }
    } => {
        const { snake, fruit, ticks, width, height } = state;

        const stepSizeIsValid = this.stepSizeIsValid(ticks);
        if (!stepSizeIsValid) {
            return {
                valid: false,
                error: {
                    code: ERROR_CODE.INVALID_STEP_SIZE,
                    message: ERROR_MESSAGE[ERROR_CODE.INVALID_STEP_SIZE]
                }
            }
        };

        const noAbruptDirectionChange = this.checkThatThereIsNoAbruptChangeInDirection(snake, ticks);
        if (!noAbruptDirectionChange) {
            return {
                valid: false,
                error: {
                    code: ERROR_CODE.INVALID_180_TURN,
                    message: ERROR_MESSAGE[ERROR_CODE.INVALID_180_TURN]
                }
            }
        };

        const snakeWithinBoundaries = this.checkThatSnakeIsWithinBoundaries(snake, ticks, width, height);
        if (!snakeWithinBoundaries) {
            return {
                valid: false,
                error: {
                    code: ERROR_CODE.SNAKE_OUT_OF_BOUNDS,
                    message: ERROR_MESSAGE[ERROR_CODE.SNAKE_OUT_OF_BOUNDS]
                }
            }
        };

        const snakeIsOnFruit = this.checkThatSnakeFinishesAtFruit(snake, fruit, ticks);
        if (!snakeIsOnFruit) {
            return {
                valid: false,
                error: {
                    code: ERROR_CODE.FRUIT_NOT_FOUND,
                    message: ERROR_MESSAGE[ERROR_CODE.FRUIT_NOT_FOUND]
                }
            }
        };

        return { valid: true }
    }

    private checkThatSnakeFinishesAtFruit = (
        snake: Board.Snake,
        fruit: Board.Fruit,
        ticks: Board.VelocityVector[]) => {

        const horizontalSteps = ticks.reduce((a, c) => {
            return a + c.velX;
        }, 0)
        const verticalSteps = ticks.reduce((a, c) => {
            return a + c.velY;
        }, 0)

        return (snake.x + horizontalSteps) === fruit.x && (snake.y + verticalSteps) === fruit.y

    }

    private checkThatSnakeIsWithinBoundaries = (
        snake: Board.Snake,
        ticks: Board.VelocityVector[],
        width: number,
        height: number) => {

        const { x, y } = snake;
        let deltaX = 0;
        let deltaY = 0;

        // check for x exceeding boundaries
        for (let i = 0; i < ticks.length; i++) {
            deltaX = deltaX + ticks[i].velX;
            deltaY = deltaY + ticks[i].velY;
            const accumX = deltaX + x;
            const accumY = deltaY + y;
            if (accumX < 0 || accumX > width || accumY < 0 || accumY > height) {
                return false;
            }
        }
        return true;
    }

    private stepSizeIsValid = (
        ticks: Board.VelocityVector[]) => {

        const hasDiagonal = ticks.some(el => el.velX !== 0 && el.velY !== 0)

        const badStepSize = ticks.some(el => el.velX > 1 || el.velX < -1 || el.velY > 1 || el.velY < -1)

        return !badStepSize && !hasDiagonal;
    }

    private checkThatThereIsNoAbruptChangeInDirection = (
        snake: Board.Snake,
        ticks: Board.VelocityVector[]) => {

        const copy = _.cloneDeep(ticks);

        copy.unshift({ velX: snake.velX, velY: snake.velY })

        for (let i = 0; i < copy.length - 1; i++) {
            let curr = copy[i];
            let next = copy[i + 1]
            if ((curr.velX !== 0 && curr.velX === -1 * next.velX)
                || (curr.velY !== 0 && curr.velY === -1 * next.velY)) {
                return false;
            }
        }
        return true;
    }

    public incrementScore = (game: Board.Moveset) => {
        const copy = _.cloneDeep(game)
        const lastTick = getLastTick(copy.ticks)
        let score = copy.score;
        score++;
        copy.score = score;
        const board = new BoardService();
        const oldFruitPosition = copy.fruit;
        const snake = {
            x: oldFruitPosition.x,
            y: oldFruitPosition.y,
            velX: lastTick.velX,
            velY: lastTick.velY
        }
        copy.fruit = board.generateNewFruitPosition({
            w: copy.width,
            h: copy.height,
            snake,
        });
        copy.snake = snake;

        return copy;
    }
}