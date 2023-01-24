import { Board } from "../types";
import _ from 'lodash';
export class Validator {

    public validate = (state: Board.Moveset) => {
        const { snake, fruit, ticks, width, height } = state;

        const snakeIsOnFruit = this.checkThatSnakeFinishesAtFruit(snake, fruit, ticks);
        const snakeWithinBoundaries = this.checkThatSnakeIsWithinBoundaries(snake, ticks, width, height);
        const noAbruptDirectionChange = this.checkThatThereIsNoAbruptChangeInDirection(snake, ticks);

        return snakeIsOnFruit && snakeWithinBoundaries && noAbruptDirectionChange
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

    private checkThatThereIsNoAbruptChangeInDirection = (
        snake: Board.Snake,
        ticks: Board.VelocityVector[]) => {

        ticks.unshift({ velX: snake.velX, velY: snake.velY })

        // check for changing directions
        for (let i = 0; i < ticks.length - 1; i++) {
            let curr = ticks[i];
            let next = ticks[i + 1]
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