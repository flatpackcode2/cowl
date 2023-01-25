import { Router } from 'express';
import { getLastTick } from '../../helpers';
import { Validator } from '../../services/validator';
import _ from 'lodash';
import { ERROR_CODE_TO_HTTP_STATUS } from '../../constants';

const validatorRouter = Router();

validatorRouter.all('/', async (req, res) => {


    if (req.method !== 'POST') {
        res.set('Allow', 'POST')
        res.status(405).json({ message: 'Method not allowed' });
        return
    }

    const validationService = new Validator();
    const body = req.body;

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
            const response = validationService.incrementScore(body, getLastTick(body));
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