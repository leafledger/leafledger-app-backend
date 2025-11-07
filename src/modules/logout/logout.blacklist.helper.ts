import { blacklistedTokens } from "./logout.controller";

// Utility to check blacklisted token
export const isTokenBlacklisted = (token: string): boolean => {
  return blacklistedTokens.includes(token);
};