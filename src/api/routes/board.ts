import { Router } from 'express';
import { Game } from '../../models';
import { generateRandomPosition } from '../../helpers';

const boardRouter = Router();

boardRouter.get('/', async (req, res) => {

    try {

        const game = await Game.create({
            width: 100,
            height: 100,
            fruit: { x: generateRandomPosition(100), y: generateRandomPosition(100) },
            snake: { x: 0, y: 0, velX: 1, velY: 0 }
        })
        console.log('game created', game.toJSON())
        const { h = 0, w = 0 } = req.query;
        console.log('is this working?')
        res.send({ game: game.toJSON() });

    } catch (err) {
        console.log('EERRROOOR')
        console.log(err)
    }
})

module.exports = boardRouter;