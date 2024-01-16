import { NextFunction, Request, Response, Router } from 'express';
import { registrationService } from '../services';
import createHttpError from 'http-errors';

const router = Router();
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const { skip, take, orderBy, where, include, select } = req.query;

    try {
        res.json(await registrationService.findAll({
            skip: Number(skip) || undefined,
            take: Number(take) || undefined,
            orderBy,
            where: where || undefined,
            include,
            select
        }));
    } catch (err: any) {
        next(createHttpError(err.statusCode || 500, err));
    }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        res.json(await registrationService.find(Number(id)));
    } catch (err: any) {
        next(createHttpError(err.statusCode || 500, err));
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const registration = req.body;

    try {
        res.json(await registrationService.create(registration));
    } catch (err: any) {
        next(createHttpError(err.statusCode || 500, err));
    }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const registration = req.body;

    try {
        res.json(await registrationService.update(Number(id), registration));
    } catch (err: any) {
        next(createHttpError(err.statusCode || 500, err));
    }
});

router.post('/:id/confirm', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        res.json(await registrationService.confirm(Number(id)));
    } catch (err: any) {
        next(createHttpError(err.statusCode || 500, err));
    }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        res.json(await registrationService.delete(Number(id)));
    } catch (err: any) {
        next(createHttpError(err.statusCode || 500, err));
    }
});

export default router;