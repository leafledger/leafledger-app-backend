import { Request, Response } from "express";
import { refreshTokenService } from "./refresh.service";
import { errorResponse, successResponse } from "../../middleware/responseHandler";

export async function refreshTokenController(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return errorResponse(res, "Refresh token is required", undefined, 400);

    const result = await refreshTokenService(refreshToken);
    return successResponse(res, { accessToken: result.accessToken }, "Token refreshed");
  } catch (error: any) {
    return errorResponse(res, error.message || "Failed to refresh token");
  }
}
