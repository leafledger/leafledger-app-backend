import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { LogoutDto } from './logout.dto';
import { logoutService } from './logout.service';
import { validationErrorHandler } from '../../middleware/errorHandler';
import {
  successResponse,
  errorResponse,
} from '../../middleware/responseHandler';

export async function logout(req: Request, res: Response) {
  try {
    // Validate request body
    const dto = new LogoutDto();
    dto.refreshToken = req.body.refreshToken;

    const errors = await validate(dto);

    // Check if validation errors exist
    if (errors.length > 0) {
      return validationErrorHandler(errors, res);
    }

    // Call service for logout logic
    const result = await logoutService(dto.refreshToken);

    return successResponse(res, {}, result.message);
  } catch (error: any) {
    return errorResponse(res, error.message || 'Logout failed');
  }
}
