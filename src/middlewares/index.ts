import { Request, Response, NextFunction } from "express";

export const restful = (
    methods: string[] = ['GET']
) => (req: Request, res: Response, next: NextFunction) => {

    if (methods.includes(req.method)) {
        return next()
    };

    res.set('Allow', methods.join(','));
    return res.status(405);

}