import { ZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req?.query,
      params: req?.params
    });
    next();
  }
  catch (err: any) {
    if (err instanceof ZodError) {
      // 400 - client-side validation failure
      return res.status(400).json({
        success: false,
        errors: err
      })
    };

    console.log(`ERROR IN VALIDATE MIDDLEWARE - ${err}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}