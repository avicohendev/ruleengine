import { facts } from "../enums/facts"
import { rules } from "../enums/rules";
import { ruleStatus } from "../enums/ruleStatus";

type factsResultsType ={
    [fact : string] : any
}
 type ruleResultType ={
    ruleName:rules,
    status: ruleStatus,
    message?: string
}
/**
 * check all rules in the array according to the facts result
 * @param rulesArray 
 * @param factsAndReuslts 
 * @returns 
 */
const rulesCheck = (rulesArray : rules[], factsAndReuslts: factsResultsType ) =>{
    const rulesResuts : ruleResultType[] =[]
    for (const rule of rulesArray){
        const result = checkSingleRule(rule, factsAndReuslts);
        rulesResuts.push(result);
    }
    return rulesResuts;
}

/**
 * validate single rule according to given facts 
 * @param rule 
 * @param factsAndReuslts 
 * @returns object with rrule name, result status and message
 */
const checkSingleRule =(rule: rules,  factsAndReuslts: factsResultsType) =>{
    const ruleResult : ruleResultType= { 
        ruleName: rule,
        status: ruleStatus.pass
    }
    switch (rule) {
        case rules.highNumberOfRows:
            if(factsAndReuslts[facts.numberOfRows] as number > 10000000){
                ruleResult.status = ruleStatus.failed;
                ruleResult.message = `Warning! Large table. The number of rows is ${factsAndReuslts[facts.numberOfRows]}`;
            }
            else{
                ruleResult.status = ruleStatus.pass;
                ruleResult.message = `The table has a small number of rows ${factsAndReuslts[facts.numberOfRows]}`;
            }
            break;
        case rules.primaryKey:
            if (factsAndReuslts[facts.hasPrimaryKey] === "true"){
                ruleResult.status = ruleStatus.pass;
                break;
            }else{
                ruleResult.status = ruleStatus.failed;
                if(factsAndReuslts[facts.numberOfRows] as number > 10000000){
                    ruleResult.message= "Warning! Heavy load. Missed Primary Key configuration for large table";
                }else{
                    ruleResult.message = "Warning: the table doesn’t have a PK";
                }
            }
            break;
        case rules.pkWithLargeAmountOfColumns:
            if(factsAndReuslts[facts.primaryKeyCountColumns] as number >= 4){
                ruleResult.status = ruleStatus.failed;
                ruleResult.message = `High number of columns in the PK. and the value of the fact ${factsAndReuslts[facts.primaryKeyCountColumns]}`

            }else{
                ruleResult.status = ruleStatus.pass;
            }
            break;
    
        default:
            break;
    }
    return ruleResult;

}
export{rulesCheck, ruleResultType, checkSingleRule, factsResultsType}