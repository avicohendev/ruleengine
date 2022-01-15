import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { rulesRoutes } from './routes/rulesRoutes';
import { errorHandler } from './controllers/errorHandler';
import { notFoundRoute } from './routes/notFoundRoute';
import { factsRoutes } from './routes/facts';


//add enviroment variables
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use('/facts',factsRoutes);
app.use('/rules',rulesRoutes);

//not found route
app.use(notFoundRoute)
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT);