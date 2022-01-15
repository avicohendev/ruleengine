
import { Response, Request, NextFunction } from "express";
import { HttpError } from "../utils/httpError";
import { getFactsForTable } from "../services/factsService";
import { logger } from "../utils/logger";

const getFacts = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        //if request missing table name param
        if(!req.query.tableName){
            throw new Error('missing table name param')
        }
        const tableName = req.query.tableName as string;
        logger.info(`get Facts For Table ${tableName}`);
       
        //call the facts service using the table name
        const factsResponse = await getFactsForTable(tableName);

       
        logger.info(`facts for table ${tableName} were calculated`);
        res.status(200).json(factsResponse);

    }
    catch (error : any){
        next(new  HttpError(400, error.message))
    }

}

export {getFacts};

