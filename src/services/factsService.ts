import { Sequelize, QueryTypes } from "sequelize";
import { connection } from "../db/config";
import { getFactsQueries} from '../queries/facts';
import { logger } from "../utils/logger";
/**
 * access the database and returns the facts of queries
 * @param tableName 
 */
const getFactsForTable = async (tableName: string)=>{

    const queries = getFactsQueries(tableName);
    const queriesResult : {[key : string]: any} = {}
    queriesResult['table-name'] = tableName;
    for (const query in queries){
       //connect to the database and perform sql query
        const queryResult = await  connection.query(queries[query] ,{
            type: QueryTypes.SELECT,
            logging: (mesage: string) => {
               return  logger.info(mesage);
            },
            raw: true,
        })
        queriesResult[query] = Object.values(queryResult[0])[0];
        
    }
    return  queriesResult;

}

export {getFactsForTable};