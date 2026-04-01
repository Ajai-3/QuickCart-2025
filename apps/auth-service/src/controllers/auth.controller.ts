import { NextFunction, Request, Response } from "express";
import { validateRegisterRequest } from "../utils/auth.helper";
import { ValidationError } from "../../../../packages/error-handler";

export const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  validateRegisterRequest(req.body, "user");
  const { name, email, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: email,
  });

  if (existingUser) {
    return next(new ValidationError("User already exists with this email"));
  }
};
