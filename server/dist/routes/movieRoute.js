"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movies_1 = require("../controllers/movies");
const router = (0, express_1.Router)();
router.get("/moviesList", movies_1.getMovies);
exports.default = router;
