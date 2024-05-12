import mongoose, { Schema, Document } from 'mongoose';

export interface Comment {
  content: string;
  author: mongoose.Types.ObjectId;
  createdAt?: Date;
}

export interface Post {
  content: string;
  author: mongoose.Types.ObjectId;
  likes: number;
  comments: Comment[];
  createdAt?: Date;
}

export interface PostDocument extends Post, Document {}

const CommentSchema: Schema = new Schema(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
  },
  {
    _id: false
  }
);

const PostSchema: Schema = new Schema(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: { type: Number, default: 0 },
    comments: [CommentSchema],
    createdAt: { type: Date, default: Date.now }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Post = mongoose.model<PostDocument>('Post', PostSchema);

export default Post;
