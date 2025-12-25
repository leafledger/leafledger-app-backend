import { Request, Response } from 'express';
import { refreshTokenService } from './refresh.service';
import {
  errorResponse,
  successResponse,
  forbiddenResponse,
} from '../../middleware/responseHandler';
import { isTokenBlacklisted } from './../logout/logout.blacklist.helper';

export async function refreshTokenController(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return errorResponse(res, 'Refresh token is required', undefined, 400);

    if (isTokenBlacklisted(refreshToken)) {
      return forbiddenResponse(
        res,
        'Token has been revoked. Please log in again!!',
      );
    }

    const result = await refreshTokenService(refreshToken);
    return successResponse(
      res,
      { accessToken: result.accessToken },
      'Token refreshed',
    );
  } catch (error: any) {
    return errorResponse(res, error.message || 'Failed to refresh token');
  }
}
