import { Router } from "express";
import { getFacts } from "../controllers/factsController";

const factsRoutes = Router();

factsRoutes.get('',getFacts);


export {factsRoutes}