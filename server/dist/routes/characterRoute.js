"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const characters_1 = require("../controllers/characters");
const router = (0, express_1.Router)();
router.get("/characters", characters_1.getCharacters);
exports.default = router;
