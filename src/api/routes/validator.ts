import { Router } from 'express';
import { Game } from '../../models';
import { generateRandomPosition } from '../../helpers';
import { Validator } from '../../services/validator';
import _ from 'lodash';

const validatorRouter = Router();

validatorRouter.post('/', async (req, res) => {

    try {

        // const joi validation

        const validationService = new Validator();
        console.log('req.body', req.body)
        const moveSet = req.body;
        const id: string = _.get(moveSet, 'gameId'); // guard against no id
        const game = await Game.findOne({ where: { id } })
        if (!game) {
            res.status(400).json({ message: 'Invalid game id' })
            return; // check for error codes - this seems wrong
        }
        /**
         * improvements
         * 1. check that game id exists before creating
         * 2. update it with incremented score, new fruit position and new snake position
         * 3. keep snake position as last move from valid moveset
         * 4. add joi validation
         * 5. data shape:{
         *     gameId: string,
         *     ticks:
         * }
         */
        const isValid = validationService.validate(req.body); // this is bad. replace this with joi validated data
        if (isValid) {
            let score = game?.score || 0; // why is score possibly undefined?
            score++;
            game.score = score;
            game.fruit = {
                x: generateRandomPosition(game.width),
                y: generateRandomPosition(game.height)
            };
            // TODO: assign last step in ticks to snake.

        }
        res.send('ok');

    } catch (err) {
        console.log(err)
    }
})

module.exports = validatorRouter;