import { Request, Response } from "express";

import User from "../models/user";
import bcrypt from "bcryptjs";
import { signJwt } from "../services/jwt";

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
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user || !user.isActive) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if(!matchPassword) {
      return res.status(411).json({
        success: false,
        message: "Incorrect email or password"
      });
    }

    let payload = {
      userId: user._id,
      verified: user.isVerified
    }

    const decoded = signJwt(payload);

    res.cookie('a_token', decoded, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      message: "User sign in successfully",
      token: decoded
    });
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
    res.clearCookie('a_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    return res.status(200).json({
      success: true,
      message: "User logged out"
    })
  }
  catch(err: any) {
    console.log(`ERROR IN AUTH LOGOUT - ${err}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}