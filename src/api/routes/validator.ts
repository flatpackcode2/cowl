import { Router } from 'express';
import { Game } from '../../models';
import { generateRandomPosition } from '../../helpers';

const validatorRouter = Router();

validatorRouter.get('/:id', (req, res) => {

    try {

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