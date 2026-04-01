import crypto from "crypto";
import { ValidationError } from "../../../../packages/error-handler";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateRegisterRequest = (
  data: any,
  userType: "user" | "seller",
) => {
  const { name, email, password, phone_number, country } = data;

  if (
    !name ||
    !email ||
    !password ||
    (userType === "seller" && (!phone_number || !country))
  ) {
    throw new ValidationError(
      `Missing required fields for ${userType} registration`,
    );
  }

  if (!emailRegex.test(email)) {
    throw new ValidationError("Invalid email format");
  }
};
