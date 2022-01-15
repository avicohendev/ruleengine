
import {  Sequelize } from 'sequelize'
import * as dotenv from 'dotenv';
dotenv.config();
/*
DATABASE_SERVER = metisdb1.database.windows.net
DATABASE_NAME = ORM
DATABASE_USER = user1
DATABASE_PASSWORD = Trustno1
*/
const database = process.env.DATABASE_NAME!
const user = process.env.DATABASE_USER!
const server = process.env.DATABASE_SERVER!
const dialect = "mssql"
const passwird = process.env.DATABASE_PASSWORD

const connection = new Sequelize(database, user, passwird, {

  host: server,
  dialect: dialect,
});

export  {connection}