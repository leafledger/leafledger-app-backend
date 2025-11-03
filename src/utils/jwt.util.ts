import jwt, { Secret } from "jsonwebtoken";

// Create tokens
const ACCESS_TOKEN_SECRET: Secret = process.env.ACCESS_TOKEN_SECRET || "access_secret_leafledger";
const REFRESH_TOKEN_SECRET: Secret = process.env.REFRESH_TOKEN_SECRET || "refresh_secret_leafledger";

const ACCESS_EXPIRES_IN = process.env.ACCESS_EXPIRES_IN;
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN;

interface UserPayload {
  email: string;
  id: string;
}

// Function to generate tokens
export const generateTokens = (user: UserPayload) => {
  
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_EXPIRES_IN } as jwt.SignOptions // short lifespan
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_EXPIRES_IN } as jwt.SignOptions // longer lifespan
  );
  return { accessToken, refreshToken };
};
