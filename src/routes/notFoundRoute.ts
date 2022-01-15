import { Router } from "express";
import { notFoundControler } from "../controllers/notFound";


const notFoundRoute = Router();

notFoundRoute.all('*', notFoundControler);


export {notFoundRoute}