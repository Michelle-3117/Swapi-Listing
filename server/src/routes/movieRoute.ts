import { Router } from "express";
import { getMovies } from "../controllers/movies";

const router = Router();
router.get("/moviesList", getMovies);

export default router