import { Request, Response } from "express";

import User from "../models/user";

export const UserProfile = async(req: Request, res: Response) => {
  try{
    const user = await User.findById((req as any)?.user.userId)
    .select('-password -otp -isActive -__v -createdAt -updatedAt')
    .lean();

    if(!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: user
    });
  }
  catch(err: any) {
    console.log(`ERROR IN USER PROFILE - ${err}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export const UserUpdate = async(req: Request, res: Response) => {
  try{
    const { name } = req.body;
    if(!name) {
      return res.status(400).json({
        success: false,
        message: "Name is a mandatory field"
      });
    }

    const user = await User.findByIdAndUpdate(
      (req as any)?.user.userId,
      { name }
    );
    if(!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User name update successfully",
      newname: user.name
    });
  }
  catch(err: any) {
    console.log(`ERROR IN USER UPDATE - ${err}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export const UserRemove = async(req: Request, res: Response) => {
  try{
    await User.findByIdAndUpdate(
      (req as any)?.user.userId,
      { isActive: false },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "User removed"
    });
  }
  catch(err: any) {
    console.log(`ERROR IN USER REMOVE - ${err}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}