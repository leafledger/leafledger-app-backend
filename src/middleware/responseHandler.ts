export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: { field: string; message: string }[];
}

export function successResponse<T = any>(
  data?: T,
  message: string = "Request successful"
): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

export function errorResponse(
  message: string = "Request failed",
  errors?: { field: string; message: string }[]
): ApiResponse {
  return {
    success: false,
    message,
    errors,
  };
}

export function serverErrorResponse(
  message: string = "Internal server error"
): ApiResponse {
  return {
    success: false,
    message,
    error: message,
  };
}

export function createdResponse<T = any>(
  data?: T,
  message: string = "Resource created successfully"
): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

export function notFoundResponse(
  message: string = "Resource not found"
): ApiResponse {
  return {
    success: false,
    message,
  };
}

export function unauthorizedResponse(
  message: string = "Unauthorized"
): ApiResponse {
  return {
    success: false,
    message,
  };
}

export function forbiddenResponse(message: string = "Forbidden"): ApiResponse {
  return {
    success: false,
    message,
  };
}
