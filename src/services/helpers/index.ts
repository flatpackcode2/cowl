import Joi from 'joi';
import { Board } from '../../types';

export const generateRandomPosition = (length: number) => {
    return Math.floor(Math.random() * length) + 1
}

export const mapError = (type: string, key: string, value?: number | string) => {
    switch (type) {
        case `string.pattern.base`:
            return `Invalid value of ${value} provided for ${key}. Please make sure it is an integer greater than 1`;
        case `any.required`:
            return `Missing value ${key}`;
        case `object.unknown`:
            return `Unknown parameter ${key} provided`;
        case `number.base`:
            return `Invalid value of ${value} provided for ${key}. Please make sure it is an integer`;
        default:
            return `Invalid value provided for ${key}`;
    }
}

export const generateErrorObject = (errorArray: {
    type: string,
    context?: Joi.Context
}[]): { [key: string]: string } => {
    const errorObject = errorArray.reduce((a, c) => {
        if (c.context && c.context.key) {
            const { value, key } = c.context;
            a[key] = mapError(c.type, key, value);
        }
        return a;
    }, {})

    return errorObject;
}

export const getLastTick = (ticks: Board.VelocityVector[]) => {
    return ticks.slice(ticks.length - 1)[0];
}