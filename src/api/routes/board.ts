import { Router } from 'express';
import { Game } from '../../models';
import { generateRandomPosition } from '../../helpers';

const boardRouter = Router();

boardRouter.get('/', async (req, res) => {

    try {
        const { w, h } = req.query;
        if (typeof w === 'string' && typeof h === 'string') {
            console.log({ w, h })

            const game = await Game.create({
                width: parseInt(w),
                height: parseInt(h),
                fruit: { x: generateRandomPosition(parseInt(w)), y: generateRandomPosition(parseInt(h)) },
                snake: { x: 0, y: 0, velX: 1, velY: 0 }
            })
            res.send({ game: game.toJSON() });
        }

    } catch (err) {
        console.log(err)
    }
})

module.exports = boardRouter;