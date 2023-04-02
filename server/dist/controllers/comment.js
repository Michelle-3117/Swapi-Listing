"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.createComment = void 0;
const uuid_1 = require("uuid");
const comments_1 = require("../models/comments");
const utils_1 = require("../utility/utils");
function createComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let newId = (0, uuid_1.v4)();
        try {
            //validate the request body
            const { error, value } = utils_1.createCommentSchema.validate(req.body, utils_1.options);
            if (error) {
                return res.status(400).json({
                    error: error.details[0].message
                });
            }
            ;
            let { urlId } = req.params;
            //create and store the comment in the database
            const record = yield comments_1.CommentInstance.create({
                id: newId,
                movieId: urlId,
                comment: value.comment,
                ipAddress: req.ip,
                createdAt: new Date(),
            });
            return res.status(201).json({
                message: 'Comment created sucessfully',
                record,
            });
        }
        catch (error) {
            return res.status(500)
                .json({
                error: "Internal server error",
                message: error
            });
        }
    });
}
exports.createComment = createComment;
function getComments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const comments = yield comments_1.CommentInstance.findAll({
                order: [["createdAt", "DESC"]],
            });
            res.status(200).json({
                message: "All comments fetched successfully",
                comments
            });
        }
        catch (error) {
            return res.status(500).json({
                error: "Internal server error",
                message: error,
            });
        }
    });
}
exports.getComments = getComments;
