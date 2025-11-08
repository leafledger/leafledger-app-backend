export const config = {
  jwt: {
    secret: process.env.JWT_SECRET || "fallback_secret_for_dev",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "10"),
  },
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  },
  server: {
    port: parseInt(process.env.PORT || "8000"),
  },
} as const;