"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_1 = require("../controllers/comment");
const router = (0, express_1.Router)();
router.post('/comments/:urlId', comment_1.createComment);
router.get('/getComments', comment_1.getComments);
exports.default = router;
