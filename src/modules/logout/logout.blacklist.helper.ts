// In-memory storage for blacklisted tokens
// TODO: Use Redis in production for distributed systems
const blacklistedTokens: string[] = [];

/**
 * Add a token to the blacklist
 */
export function addToBlacklist(token: string): void {
  if (!blacklistedTokens.includes(token)) {
    blacklistedTokens.push(token);
  }
}

/**
 * Check if a token is blacklisted
 */
export function isTokenBlacklisted(token: string): boolean {
  return blacklistedTokens.includes(token);
}
