import { facts } from "../enums/facts";
export const getFactsQueries  = (tableName : string) =>  { 
    const queries : {[key: string]: string} =   {
        [facts.numberOfRows]: `SELECT count(*) FROM ${tableName}`,
        [facts.numberOfIndexes]: `SELECT count(*) FROM  sys.indexes AS IND WHERE object_id = object_ID('${tableName}') AND index_id != 0`,
        [facts.hasPrimaryKey]: `SELECT CASE WHEN Count(index_id) = 1 THEN 'true' ELSE 'false' END FROM sys.indexes WHERE object_id = object_id('${tableName}') AND is_primary_key = 1`,
        [facts.primaryKeyCountColumns]: `SELECT COUNT(INC.column_id) FROM sys.indexes as IND INNER JOIN sys.index_columns as INC ON IND.object_id = INC.object_id AND IND.index_id = INC.index_id WHERE IND.object_id = object_id('${tableName}') AND IND.is_primary_key = 1`
    }
    return queries;
};

