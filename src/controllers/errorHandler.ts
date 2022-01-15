import { ErrorRequestHandler,Response, Request, NextFunction  } from "express";
import {HttpError} from '../utils/httpError'
import { logger } from "../utils/logger";
export const errorHandler : ErrorRequestHandler = (err: HttpError, req:Request, res: Response, next: NextFunction) =>{
    logger.error(err.message);
    res.status(err.httpStatus).json({message: err.message});

}