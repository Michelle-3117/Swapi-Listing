import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { CommentInstance } from "../models/comments";
import { createCommentSchema, options } from "../utility/utils";

export async function createComment(req: Request, res: Response) {
  let newId = uuidv4();
  try {
    //validate the request body
    const { error, value } = createCommentSchema.validate(req.body, options);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    let { urlId } = req.params;
    //create and store the comment in the database
    const record = await CommentInstance.create({
      id: newId,
      movieId: urlId,
      comment: value.comment,
      ipAddress: req.ip,
      createdAt: new Date(),
    });

    return res.status(201).json({
      message: "Comment created sucessfully",
      record,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
      message: error,
    });
  }
}
export async function getComments(req: Request, res: Response) {
  try {
    const comments = await CommentInstance.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({
      message: "All comments fetched successfully",
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: error,
    });
  }
}
