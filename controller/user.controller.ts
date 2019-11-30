import Comment, { IComment } from "../models/user.model";
import mongoose from 'mongoose';

export interface ICommentController {
  get(key): Promise<[IComment]>;
  add(key: string, userId: string, content: string): Promise<[IComment]>
}

export class CommentController implements ICommentController {
  
  get (key): Promise<[IComment]> {
    mongoose.connect(process.env.mongoDBHost);
    return Comment.find();
  }

  add(key, userId, content): Promise<[IComment]> {
    mongoose.connect(process.env.mongoDBHost);
    return new Comment({
      msgId: key,
      userId,
      content,
    });
  }
}