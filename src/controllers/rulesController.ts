import { Response, Request, NextFunction } from "express";
import { HttpError } from "../utils/httpError";
import { getFactsForTable } from "../services/factsService";
import { rulesCheck} from "../rules/rules";
import { rules} from '../enums/rules'
import { logger } from "../utils/logger";


const getRules = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        if(!req.query.tableName){
            throw new Error('missing table name param')
        }
        
        const tableName = req.query.tableName as string;
        logger.info(`calculate rules for table ${tableName}`);
        const factsResponse = await getFactsForTable(tableName);
        //get all the rules
        const rulesArray = Object.values(rules);
        const rulesResult =rulesCheck(rulesArray, factsResponse);

        logger.info(`rules for table ${tableName} were calculated`);
        //the result is in a format of thable name and rules array
        res.status(200).json({
            tableName: tableName,
            rules: rulesResult
        });

    }
    catch (error : any){
        next(new  HttpError(400, error.message))
    }

}

export {getRules};