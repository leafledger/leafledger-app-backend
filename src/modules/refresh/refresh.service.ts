import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import { verifyToken } from "../../utils/jwt.util";

export async function refreshTokenService(refreshToken: string) {
  try {
    // Verify the refresh token using centralized utility
    const decoded = await verifyToken(refreshToken, "refresh");

    // Generate new access token
    const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET! || config.jwt.secret;
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      ACCESS_SECRET,
      { expiresIn: config.jwt.accessExpiresIn } as jwt.SignOptions
    );

    return { accessToken: newAccessToken };
  } catch {
    throw new Error("Invalid or expired refresh token");
  }
}