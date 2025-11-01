import { Request, Response } from "express";

import User from "../models/user";
import bcrypt from "bcryptjs";

export const AuthRegister = async(req: Request, res: Response) => {
  try{
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if(user) {
      return res.status(401).json({
        success: false,
        message: "User already exist"
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const data = await User.create({
      name, email, password: hashPassword
    });

    return res.status(200).json({
      success: true,
      message: "User registered",
      data
    });
  }
  catch(err: any) {
    console.log(`ERROR IN AUTH REGISTER - ${err}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export const AuthVerify = async(req: Request, res: Response) => {
  try{
    const user = (req as any).user;
    const { otp } = req.body;

    if(!otp) {
      return res.status(401).json({
        success: false,
        message: "OTP is required for verification"
      });
    }

    const findUser = await User.findById(user.userId).lean();

    if(otp !== findUser?.otp) {
      return res.status(403).json({
        success: false,
        message: "Incorrect OTP"
      });
    }

    await User.findByIdAndUpdate(
      findUser?._id,
      { otp: null, isVerified: true }
    ).lean();

    return res.status(200).json({
      success: true,
      message: "User verified successfully"
    });

  }
  catch(err: any) {
    console.log(`ERROR IN AUTH VERIFY - ${err}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export const AuthSignIn = async(req: Request, res: Response) => {
  try{

  }
  catch(err: any) {
    console.log(`ERROR IN AUTH SIGNIN - ${err}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export const AuthLogout = async(req: Request, res: Response) => {
  try{

  }
  catch(err: any) {
    console.log(`ERROR IN AUTH LOGOUT - ${err}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}