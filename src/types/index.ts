export declare namespace Board {

    interface State {
        gameId: String;
        width: number;
        height: number;
        score: number;
        fruit: Fruit;
        snake: Snake;
    }

    interface VelocityVector {
        velX: -1 | 0 | 1;
        velY: -1 | 0 | 1;
    }

    interface Moveset extends State {
        ticks: VelocityVector[]
    }

    interface Coordinates {
        x: number;
        y: number;
    }

    interface Fruit extends Coordinates { }


    interface Snake extends Coordinates, VelocityVector { }
}
