import { Request, Response, NextFunction } from 'express';

// Global error handling middleware
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error('Error occurred:', err);

  // Determine status code based on error type
  const statusCode = err.statusCode || 500;

  // Don't expose sensitive error details in production
  const message =
    process.env.NODE_ENV === 'production'
      ? statusCode === 500
        ? 'Internal Server Error'
        : err.message
      : err.message;

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
}

// Validation error handler
export function validationErrorHandler(errors: any[], res: Response) {
  if (errors.length > 0) {
    const formattedErrors = errors.map((e) => ({
      field: e.property,
      message: Object.values(e.constraints || {})[0],
    }));

    return res.status(400).json({
      message: 'Validation failed',
      errors: formattedErrors,
    });
  }
}
