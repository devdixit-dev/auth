import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../services/jwt";

const isAuth = async(req: Request, res: Response, next: NextFunction) => {
  try{
    const token = req.cookies.a_token;

    if(!token) {
      return res.status(403).json({
        success: false,
        message: "Token not available"
      });
    }

    const decoded = verifyJwt(token);
    if(!decoded) {
      return res.status(403).json({
        success: false,
        message: 'Invalid token'
      });
    }

    (req as any).user = decoded;
    next();
  }
  catch(err){
    console.log(`ERROR IN IS AUTH MIDDLEWARE - ${err}`);
    return res.status(403).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export default isAuth;