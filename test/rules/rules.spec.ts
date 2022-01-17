import { expect } from "chai";
import {checkSingleRule, factsResultsType, rulesCheck} from '../../src/rules/rules'
import {rules} from '../../src/enums/rules';
import {facts} from '../../src/enums/facts';
import {ruleStatus} from '../../src/enums/ruleStatus'

/**
 * test rule engine logic
 */
describe('test single rules', ()=> {
    it('small table', () =>{
        const factsResults :factsResultsType = {
           
            [facts.numberOfRows] : 100
        }
        const checkSmallNumberOfRows = checkSingleRule(rules.highNumberOfRows, factsResults);
        expect(checkSmallNumberOfRows.status).to.equal(ruleStatus.pass) 
        expect(checkSmallNumberOfRows.message).to.equal(`The table has a small number of rows ${factsResults[facts.numberOfRows]}`) 
    });
    it('large table', () =>{
        const factsResults :factsResultsType = {
           
            [facts.numberOfRows] : 10000001
        }
        const checkSmallNumberOfRows = checkSingleRule(rules.highNumberOfRows, factsResults);
        expect(checkSmallNumberOfRows.status).to.equal(ruleStatus.failed) 
        expect(checkSmallNumberOfRows.message).to.equal(`Warning! Large table. The number of rows is ${factsResults[facts.numberOfRows]}`) 
    });
    it('has primary key', () =>{
        const factsResults :factsResultsType = {
           
            [facts.hasPrimaryKey] : "true"
        }

        const checkHasPrimaryKey = checkSingleRule(rules.highNumberOfRows, factsResults);
        expect(checkHasPrimaryKey.status).to.equal(ruleStatus.pass) 
       
    });
    it('no primary key', () =>{
        const factsResults :factsResultsType = {
           
            [facts.hasPrimaryKey] : "false"
        }
        const checkHasPrimaryKey = checkSingleRule(rules.primaryKey, factsResults);
        expect(checkHasPrimaryKey.status).to.equal(ruleStatus.failed)
        expect(checkHasPrimaryKey.message).to.equal(`Warning: the table doesn’t have a PK`) 
       
    });
    it('heavy load with no primary key', () =>{
        const factsResults :factsResultsType = {
            [facts.numberOfRows] : 10000001,
            [facts.hasPrimaryKey] : "false"
        }
        const checkSmallNumberOfRows = checkSingleRule(rules.primaryKey, factsResults);
        expect(checkSmallNumberOfRows.status).to.equal(ruleStatus.failed)
        expect(checkSmallNumberOfRows.message).to.equal(`Warning! Heavy load. Missed Primary Key configuration for large table`) 
       
    });

    it('large amount of columns in primary key', () =>{
        const factsResults :factsResultsType = {
            [facts.primaryKeyCountColumns] : 5,
           
        }
        const checPkWithLargeAmountOfColumns = checkSingleRule(rules.pkWithLargeAmountOfColumns, factsResults);
        expect(checPkWithLargeAmountOfColumns.status).to.equal(ruleStatus.failed)
       
       
    });
    it('small amount of columns in primary key', () =>{
        const factsResults :factsResultsType = {
            [facts.primaryKeyCountColumns] : 3,
           
        }
        const checPkWithLargeAmountOfColumns = checkSingleRule(rules.pkWithLargeAmountOfColumns, factsResults);
        expect(checPkWithLargeAmountOfColumns.status).to.equal(ruleStatus.pass)
    });

});