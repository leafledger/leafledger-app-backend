import jwt, { Secret } from "jsonwebtoken";
import { config } from "../config/config";

// Create tokens
const ACCESS_TOKEN_SECRET: Secret = process.env.ACCESS_TOKEN_SECRET || config.jwt.secret;
const REFRESH_TOKEN_SECRET: Secret = process.env.REFRESH_TOKEN_SECRET || config.jwt.secret;

interface UserPayload {
  email: string;
  id: string;
}

export const generateTokens = (user: UserPayload) => {

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
};
