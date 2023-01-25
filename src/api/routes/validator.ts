import { Router } from 'express';
import { Validator } from '../../services/validator';
import _ from 'lodash';
import { ERROR_CODE_TO_HTTP_STATUS } from '../../constants';
import { generateErrorObject } from '../../services/helpers';
import Joi from 'joi';

const validatorRouter = Router();

const gameSchema = Joi.object({
    gameId: Joi.string(),
    width: Joi.number().integer().required().min(2),
    height: Joi.number().integer().required().min(2),
    score: Joi.number().integer().required(),
    fruit: Joi.object({
        x: Joi.number().integer().required(),
        y: Joi.number().integer().required(),
    }),
    snake: Joi.object({
        x: Joi.number().integer().required(),
        y: Joi.number().integer().required(),
        velX: Joi.number().integer().required(),
        velY: Joi.number().integer().required(),
    }),
    ticks: Joi.array().items({
        velX: Joi.number().integer().required(),
        velY: Joi.number().integer().required(),
    })
})

validatorRouter.all('/', (req, res) => {

    console.log('===reg', req)
    if (req.method !== 'POST') {
        res.set('Allow', 'POST')
        res.status(405).json({ message: 'Method not allowed' });
        return
    }

    const body = req.body;
    const result = gameSchema.validate(body, { abortEarly: false })



    const validationService = new Validator();
    if (result.error) {
        const error = generateErrorObject(result.error.details)
        res.status(400).json({ error })
        return;
    }

    try {

        const moveSet = {
            width: body.width,
            height: body.height,
            fruit: body.fruit,
            snake: body.snake,
            ticks: body.ticks,
        }

        const isValid = validationService.validate(moveSet);

        if (isValid.valid) {
            const response = validationService.incrementScore(body);
            res.status(200).json(response);

        } else if (isValid.error) {
            res.status(ERROR_CODE_TO_HTTP_STATUS[isValid.error.code]).json({
                error: isValid.error.message
            })
        }
        return;

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' })
    }
})

module.exports = validatorRouter;