import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";

// Create tokens
const ACCESS_TOKEN_SECRET: Secret = process.env.ACCESS_TOKEN_SECRET || config.jwt.secret;
const REFRESH_TOKEN_SECRET: Secret = process.env.REFRESH_TOKEN_SECRET || config.jwt.secret;

interface UserPayload {
  email: string;
  id: string;
}

export function generateTokens(user: UserPayload) {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    ACCESS_TOKEN_SECRET,
    { expiresIn: config.jwt.accessExpiresIn } as jwt.SignOptions
  );
  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    REFRESH_TOKEN_SECRET,
    { expiresIn: config.jwt.refreshExpiresIn } as jwt.SignOptions
  );
  return { accessToken, refreshToken };
}

/**
 * Verify a JWT token (access or refresh)
 * @param token - The token to verify
 * @param tokenType - Type of token: 'access' or 'refresh'
 * @returns Promise that resolves to the decoded token payload
 */
export function verifyToken(
  token: string,
  tokenType: "access" | "refresh" = "access"
): Promise<JwtPayload> {
  const secret = tokenType === "access" ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;

  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err || !decoded) return reject(err);
      resolve(decoded as JwtPayload);
    });
  });
}
