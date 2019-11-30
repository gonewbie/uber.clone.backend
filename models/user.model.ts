import mongoose, { Schema, Document } from 'mongoose';

const Schema = mongoose.Schema;

export interface IComment extends Document {
  msgId: number;
  userId: string;
  content: string;
  createdAt: string;
  deleted: boolean;
};

const CommentSchema = new Schema({
  msgId: {
    type: Number,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  deleted: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model<IComment>('Comment', CommentSchema);
