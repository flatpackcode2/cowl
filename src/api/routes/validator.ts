import { Router } from 'express';
import { Game } from '../../models';
import { generateRandomPosition, getLastTick } from '../../helpers';
import { Validator } from '../../services/validator';
import _ from 'lodash';
import { Board } from '../../services/board';

const validatorRouter = Router();

validatorRouter.post('/', async (req, res) => {

    try {
        const validationService = new Validator();
        const body = req.body;
        const id: string = _.get(body, 'gameId'); // guard against no id
        const game = await Game.findOne({ where: { id } })
        if (!game) {
            res.status(400).json({ message: 'Invalid game id' })
            return; // check for error codes - this seems wrong
        }

        const moveSet = {
            width: game.width,
            height: game.height,
            fruit: game.fruit,
            snake: game.snake,
            ticks: body.ticks,
        }

        const isValid = validationService.validate(moveSet); // this is bad. replace this with joi validated data

        if (isValid) {
            let score = game?.score || 0; // why is score possibly undefined?
            score++;
            game.score = score;
            const board = new Board();
            const lastVelVector = getLastTick(body.ticks);
            const oldFruitPosition = game.fruit;
            const snake = {
                x: oldFruitPosition.x,
                y: oldFruitPosition.y,
                velX: lastVelVector.velX,
                velY: lastVelVector.velY
            }
            game.fruit = board.generateNewFruitPosition({
                w: game.width,
                h: game.height,
                snake,
            });
            game.snake = snake;
            await game.save();
            res.status(200).json(game.toJSON());
        } else {
            res.status(400).json({
                error: 'Fruit not found'
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' })
    }
})

module.exports = validatorRouter;