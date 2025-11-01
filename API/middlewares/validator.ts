import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try{
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    });
    next();
  }
  catch(err: any) {
    console.log(`ERROR IN VALIDATE MIDDLEWARE - ${err}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}