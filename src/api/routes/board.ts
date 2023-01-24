import { Router } from 'express';
import { Game } from '../../models';
import { Board } from '../../services/board';
import Joi from 'joi';
import { generateErrorObject } from '../../helpers';

const boardRouter = Router();

const newGameSchema = Joi.object({
    w: Joi.string().pattern(new RegExp(`^[1-9][0-9]*$`)).required(),
    h: Joi.string().pattern(new RegExp(`^[1-9][0-9]*$`)).required(),
})

boardRouter.get('/', async (req, res) => {
    try {
        const data = req.query;
        const result = newGameSchema.validate(data, { abortEarly: false });
        if (result.error) {
            const error = generateErrorObject(result.error.details)
            res.status(400).json({ error })
        }
        if (!result.error) {
            const { w, h } = data;
            if (typeof w === 'string' && typeof h === 'string') {
                const board = new Board(new Game())
                const game = await board.create(w, h);
                res.status(201).json({ game: game.toJSON() });
            }
        }

    } catch (err) {
        console.log(err)
        res.send(null)
    }
})

module.exports = boardRouter;