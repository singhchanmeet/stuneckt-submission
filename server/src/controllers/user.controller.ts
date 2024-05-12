import { Request, Response } from 'express';
import User, { UserDocument } from '../models/user.model';

interface AuthenticatedRequest extends Request {
  user?: any; 
}

export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Get authenticated user's ID from req.user
    const userId = req.user?.userId;

    // Fetch user details from the database
    const user: UserDocument | null = await User.findById(userId);
    
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send user details in the response
    res.status(200).json({
      username: user.username,
      email: user.email,
      name: user.name,
      followers: user.followers,
      following: user.following
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
