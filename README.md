# Instructions

## Setup
1. Ensure that version 18.x of [Node](https://nodejs.org/en/download/) in installed on your machine.
2. Run `npm i` at the root of this directory to install all required packages.
3. Run `npm run dev` at the root of this directory. This will start the server at (http://localhost:1337)
4. The endpoints can be accessed at GET http://localhost:1337/new?w=[width]&h=[height] and POST http://localhost:1337/validate
5. Tests can be run with npm run test

## Improvements
1. Ensured that fruit and snake never coincide when a game starts
2. Set minimum game board size to be 2x2 as having any smaller gives rise to either snake overlapping fruit (1x1) or snake 
   forced to do 180 degree turn eg 2x1 where snake is at (2,0) with velx:1, vely:0 and fruit at (1,0).

## Limitations
1. This submission does not have a db attached.