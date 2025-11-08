import jwt from "jsonwebtoken";
import { config } from "../../config/config";

export async function refreshTokenService(refreshToken: string) {
  const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET! || config.jwt.secret;
  const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET! || config.jwt.secret;

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as any;
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