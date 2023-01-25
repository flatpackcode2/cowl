import { Board } from "../types";
import _ from 'lodash';
import { ERROR_CODE, ERROR_MESSAGE } from "../constants";

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

        // break up logic and return http status codes for where condition fails instead of just boolean;
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

        console.log({ horizontalSteps, verticalSteps })

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

        const found = ticks.find(el => el.velX > 1 || el.velX < -1 || el.velY > 1 || el.velY < -1)

        return !Boolean(found);
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

    private incrementScore = (state: Board.State) => {

        const newState = _.cloneDeep(state).omit('ticks');
        let score = _.get(newState, 'score', 0);
        score++;
        newState.set(newState, 'score', score);

        return newState;
    }
}