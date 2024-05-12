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



export const followUser = async (req: AuthenticatedRequest, res: Response)=> {
  try {
    const { usernameToFollow } = req.params;
    const loggedInUserId = req.user.userId;

    // Find the user who wants to follow another user
    const loggedInUser: UserDocument | null = await User.findById(loggedInUserId);
    if (!loggedInUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the user to be followed
    const userToFollow: UserDocument | null = await User.findOne({ username: usernameToFollow });
    if (!userToFollow) {
      return res.status(404).json({ message: 'User to follow not found' });
    }

    // Check if the logged-in user is already following the user to be followed
    const alreadyFollowing = loggedInUser.following.includes(userToFollow._id);
    if (alreadyFollowing) {
      return res.status(400).json({ message: 'User is already being followed' });
    }

    // Update the logged-in user's following list
    loggedInUser.following.push(userToFollow._id);
    await loggedInUser.save();

    // Update the user to be followed's followers list
    userToFollow.followers.push(loggedInUser._id);
    await userToFollow.save();

    res.status(200).json({ message: 'User followed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const updateUserDetails = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { username, email, name } = req.body;
    const loggedInUserId = req.user.userId;

    // Find the user to update
    const userToUpdate: UserDocument | null = await User.findById(loggedInUserId);
    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    userToUpdate.username = username || userToUpdate.username;
    userToUpdate.email = email || userToUpdate.email;
    userToUpdate.name = name || userToUpdate.name;

    await userToUpdate.save();

    res.status(200).json({ message: 'User details updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};