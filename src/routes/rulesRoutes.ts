import { Router } from "express";
import { getRules } from "../controllers/rulesController";

const rulesRoutes = Router();

rulesRoutes.get('', getRules);


export {rulesRoutes}