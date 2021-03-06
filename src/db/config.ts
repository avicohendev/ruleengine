
import {  Sequelize } from 'sequelize'
import * as dotenv from 'dotenv';
dotenv.config();

const database = process.env.DATABASE_NAME!
const user = process.env.DATABASE_USER!
const server = process.env.DATABASE_SERVER!
const dialect = "mssql"
const password = process.env.DATABASE_PASSWORD!

const connection = new Sequelize(database, user, password, {

  host: server,
  dialect: dialect,
});

export  {connection}