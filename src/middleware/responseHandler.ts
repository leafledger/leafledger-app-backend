import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: { field: string; message: string }[];
}

export function successResponse<T = any>(
  res: Response,
  data?: T,
  message: string = 'Request successful',
  statusCode: number = 200,
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function errorResponse(
  res: Response,
  message: string = 'Request failed',
  errors?: { field: string; message: string }[],
  statusCode: number = 400,
) {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
}

export function serverErrorResponse(
  res: Response,
  message: string = 'Internal server error',
) {
  return res.status(500).json({
    success: false,
    message,
    error: message,
  });
}

export function createdResponse<T = any>(
  res: Response,
  data?: T,
  message: string = 'Resource created successfully',
) {
  return res.status(201).json({
    success: true,
    message,
    data,
  });
}

export function notFoundResponse(
  res: Response,
  message: string = 'Resource not found',
) {
  return res.status(404).json({
    success: false,
    message,
  });
}

export function unauthorizedResponse(
  res: Response,
  message: string = 'Unauthorized',
) {
  return res.status(401).json({
    success: false,
    message,
  });
}

export function forbiddenResponse(
  res: Response,
  message: string = 'Forbidden',
) {
  return res.status(403).json({
    success: false,
    message,
  });
}
