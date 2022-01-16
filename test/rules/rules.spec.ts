import { expect } from "chai";

import {stub } from 'sinon';
import {checkSingleRule, factsResultsType} from '../../src/rules/rules'
import {rules} from '../../src/enums/rules';
import {facts} from '../../src/enums/facts';
import {ruleStatus} from '../../src/enums/ruleStatus'


/**
 * test rule engine logic
 */
describe('test single rules', ()=> {
    it('test small table rule success ', () =>{
        const factsResults :factsResultsType = {
           
            [facts.numberOfRows] : 100
        }
        const checkSmallNumberOfRows = checkSingleRule(rules.highNumberOfRows, factsResults);
        expect(checkSmallNumberOfRows.status).to.equal(ruleStatus.pass) 
        expect(checkSmallNumberOfRows.message).to.equal(`The table has a small number of rows ${factsResults[facts.numberOfRows]}`) 
    });
    it('test small table rule failed ', () =>{
        const factsResults :factsResultsType = {
           
            [facts.numberOfRows] : 10000001
        }
        const checkSmallNumberOfRows = checkSingleRule(rules.highNumberOfRows, factsResults);
        expect(checkSmallNumberOfRows.status).to.equal(ruleStatus.failed) 
        expect(checkSmallNumberOfRows.message).to.equal(`Warning! Large table. The number of rows is ${factsResults[facts.numberOfRows]}`) 
    });
    it('test has primary key success', () =>{
        const factsResults :factsResultsType = {
           
            [facts.hasPrimaryKey] : "true"
        }
        const checkSmallNumberOfRows = checkSingleRule(rules.highNumberOfRows, factsResults);
        expect(checkSmallNumberOfRows.status).to.equal(ruleStatus.pass) 
       
    });
    it('test has primary key fail', () =>{
        const factsResults :factsResultsType = {
           
            [facts.hasPrimaryKey] : "false"
        }
        const checkSmallNumberOfRows = checkSingleRule(rules.primaryKey, factsResults);
        expect(checkSmallNumberOfRows.status).to.equal(ruleStatus.failed)
        expect(checkSmallNumberOfRows.message).to.equal(`Warning: the table doesn’t have a PK`) 
       
    });
    it('test has primary key and large table fail', () =>{
        const factsResults :factsResultsType = {
            [facts.numberOfRows] : 10000001,
            [facts.hasPrimaryKey] : "false"
        }
        const checkSmallNumberOfRows = checkSingleRule(rules.primaryKey, factsResults);
        expect(checkSmallNumberOfRows.status).to.equal(ruleStatus.failed)
        expect(checkSmallNumberOfRows.message).to.equal(`Warning! Heavy load. Missed Primary Key configuration for large table`) 
       
    });

});