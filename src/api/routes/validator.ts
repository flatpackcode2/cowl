import { Router } from 'express';
import { Game } from '../../models';
import { generateRandomPosition } from '../../helpers';
import { Validator } from '../../services/validator';

const validatorRouter = Router();

validatorRouter.post('/', (req, res) => {

    try {

        const validationService = new Validator();
        console.log('req.body', req.body)
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
        const game = Game.create({
            width: 100,
            height: 100,
            fruit: { x: generateRandomPosition(100), y: generateRandomPosition(100) },
            snake: { x: 0, y: 0, velX: 1, velY: 0 }
        })
        res.send('ok');

    } catch (err) {
        console.log(err)
    }
})

module.exports = validatorRouter;