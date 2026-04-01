import { AppError } from ".";
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    console.log(`Error ${req.method} ${req.url} - ${err.message}`);
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      ...(err.details && { details: err.details }),
    });
  }

  console.error("Unknown error:", err);

  return res.status(500).json({
    error: "Something went wrong, please try again later",
  });
};
