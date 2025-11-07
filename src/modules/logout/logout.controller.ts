import { Request, Response } from "express";
import jwt from "jsonwebtoken";

// Example: store invalid tokens in-memory (use Redis in production)
export const blacklistedTokens: string[] = [];

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token required" });
    }

    // Verify refresh token before blacklisting
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      // Add to blacklist so that in future if somebody steal the current token then refresh api can not grant the hacker
      blacklistedTokens.push(refreshToken);
      return res.status(200).json({ message: "Logged out successfully" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
