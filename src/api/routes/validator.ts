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
        const moveSet = req.body;
        const id: string = _.get(moveSet, 'gameId'); // guard against no id
        const game = await Game.findOne({ where: { id } })
        if (!game) {
            res.status(400).json({ message: 'Invalid game id' })
            return; // check for error codes - this seems wrong
        }

        const isValid = validationService.validate(req.body); // this is bad. replace this with joi validated data
        if (isValid) {
            let score = game?.score || 0; // why is score possibly undefined?
            score++;
            game.score = score;
            const board = new Board();
            const lastVelVector = getLastTick(moveSet.ticks);
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
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' })
    }
})

module.exports = validatorRouter;