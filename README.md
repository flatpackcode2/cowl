# Instructions

## About
A take home coding assignment where the objective is to build a validation endpoint for a snake game given the following conditions:
- The snake will never be longer than length 1. It will not grow after eating a fruit.
- There will only be a single fruit at a time on the game board.
- If the snake hits the edge of the game bounds, the game is over.
- The snake will always start at position (0, 0), with a random position for the fruit
- The movement of the snake is described as `ticks` where it's value is (velX, velY). Either velX or velY may hold a non-zero value in a tick and the non-zero value can only be `-1` or `1`. Ie. `(0,1)`, `(1,0)`, `(-1,0)`, `(0,-1)` and `(0,0)` are valid values - `(1,1)` and `(-1,-1)` are not.


## Setup
1. Ensure that version 18.x of [Node](https://nodejs.org/en/download/) in installed on your machine.
2. Run `npm i` at the root of this directory to install all required packages.
3. Run `npm run dev` at the root of this directory. This will start the server at (http://localhost:1337)
4. The endpoints can be accessed at GET http://localhost:1337/new?w=[width]&h=[height] and POST http://localhost:1337/validate
5. Tests can be run with `npm run test`

## Improvements
1. Ensured that fruit and snake never coincide when a game starts
2. Set minimum game board size to be 2x2 as having any smaller gives rise to either snake overlapping fruit (1x1) or snake 
   forced to do 180 degree turn eg 2x1 where snake is at (2,0) with velx:1, vely:0 and fruit at (1,0).

## Limitations
1. This submission does not have a db attached.
