import { Request, Response } from 'express';
import User from '../models/user.model';
import Post from '../models/post.model';

interface AuthenticatedRequest extends Request {
    user?: any; 
}

export const createPost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { content } = req.body;
    const userId = req.user.userId;

    const newPost = new Post({
      content,
      author: userId,
      likes: 0,
      comments: []
    });

    await newPost.save();

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 }).populate('author', 'username');
  
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  



  export const getPostsByUser = async (req: Request, res: Response) => {
    try {
      const username = req.params.username; // Assuming the parameter name is 'username'
  
      // Check if username is provided
      if (!username) {
        return res.status(400).json({ message: 'Username is required' });
      }
  
      // Find the user by username
      const user = await User.findOne({ username });
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Get the ObjectId of the user
      const userId = user._id;
  
      // Find posts by userId
      const posts = await Post.find({ author: userId }).sort({ createdAt: -1 });
  
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };