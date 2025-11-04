import jwt from "jsonwebtoken";

export async function refreshTokenService(refreshToken: string) {
  const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;
  const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;

  // token expiry time   
  const ACCESS_EXPIRES_IN = process.env.ACCESS_EXPIRES_IN;

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as any;
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      ACCESS_SECRET,
      { expiresIn: ACCESS_EXPIRES_IN } as jwt.SignOptions
    );

    return { accessToken: newAccessToken };
  } catch {
    throw new Error("Invalid or expired refresh token");
  }
}
