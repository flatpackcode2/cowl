import { Router } from 'express';
import { Game } from '../../models';
import { Board } from '../../services/board';

const boardRouter = Router();

boardRouter.get('/', async (req, res) => {
    try {
        const { w, h } = req.query;
        if (typeof w === 'string' && typeof h === 'string') {
            const board = new Board(new Game())
            const game = await board.create(w, h);
            res.status(201).json({ game: game.toJSON() });
        }

    } catch (err) {
        console.log(err)
        res.send(null)
    }
})

module.exports = boardRouter;