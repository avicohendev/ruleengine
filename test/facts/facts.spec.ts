import { getFactsForTable } from "../services/factsService";
import Sinon, {stub} from 'sinon';
import chai from 'chai';
import { connection } from "../db/config";
import {expect} from 'chai';


describe('test facts service', ()=>{
    it('checks right format of facts results according to query data', async function(){
        //stub qeury sequelize query results
        const sequelizeQuery = stub(connection, "query");

        //stub the query result, which runs 4 times in getFactsForTable 
        sequelizeQuery.onCall(0).returns(Promise.resolve([[50],undefined]));
        sequelizeQuery.onCall(1).returns(Promise.resolve([[10],undefined]));
        sequelizeQuery.onCall(2).returns(Promise.resolve([[ true],undefined]));
        sequelizeQuery.onCall(3).returns(Promise.resolve([[ 20],undefined]));
        const answer :  any =  await getFactsForTable("testTable") ; //.then(result =>{
            
            expect(answer['table-name']).to.equal('testTable');
            expect(answer['number-of-rows']).to.equal(50);
            expect(answer['number-of-indexes']).to.equal(10);
            expect(answer['has-primary-key']).to.equal(true);
            expect(answer['primary-key-count-columns']).to.equal(20);
    });
})