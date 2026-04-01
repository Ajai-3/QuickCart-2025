export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: any;

  constructor(
    message: string,
    statusCode: number,
    isOperational: boolean,
    details?: any,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
    Error.captureStackTrace(this);
  }
}
// Not Found Error
export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404, true);
  }
}

// Validation Error
export class ValidationError extends AppError {
  constructor(message = "Invalid request data", details?: any) {
    super(message, 400, true, details);
  }
}

// Authorization Error
export class AuthorizationError extends AppError {
  constructor(message = "Authorization failed", details?: any) {
    super(message, 401, true, details);
  }
}

// Forbidden Error
export class ForbiddenError extends AppError {
  constructor(message = "Forbidden access", details?: any) {
    super(message, 403, true, details);
  }
}

// Conflict Error
export class ConflictError extends AppError {
  constructor(message = "Conflict error occurred", details?: any) {
    super(message, 409, true, details);
  }
}
// Database Error (MongoDB, MySQL, PostgreSQL, etc.)
export class DatabaseError extends AppError {
  constructor(message = "Database error occurred", details?: any) {
    super(message, 500, true, details);
  }
}

// Rate Limit Error
export class RateLimitError extends AppError {
  constructor(
    message = "Too many requests, please try again later",
    details?: any,
  ) {
    super(message, 429, true, details);
  }
}
