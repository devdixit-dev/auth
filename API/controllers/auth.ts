import { Request, Response } from "express";

export const AuthRegister = async(req: Request, res: Response) => {
  try{
    const { name, email, password } = req.body;
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