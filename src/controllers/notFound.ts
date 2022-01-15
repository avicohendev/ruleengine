import { Response, Request, NextFunction } from "express";
import { HttpError} from '../utils/httpError'

export const notFoundControler = (req: Request, res: Response, next: NextFunction) =>{
    next( new HttpError(404, "route not found"));
}