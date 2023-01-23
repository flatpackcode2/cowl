import { Game } from "../models"
import { generateRandomPosition } from "../helpers";
export class Board {

    private game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    public create = async (w: string, h: string) => {
        const game = await Game.create({
            width: parseInt(w),
            height: parseInt(h),
            fruit: {
                x: generateRandomPosition(parseInt(w)),
                y: generateRandomPosition(parseInt(h))
            },
            snake: { x: 0, y: 0, velX: 1, velY: 0 }
        })
        console.log('game', game)
        return game
    }

    public validateParams = (params: { w: number, h: number }) => {

    }


}