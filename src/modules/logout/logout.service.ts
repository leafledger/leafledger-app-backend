import { verifyToken } from '../../utils/jwt.util';
import { addToBlacklist } from './logout.blacklist.helper';

/**
 * Service to handle logout logic
 * Verifies the refresh token and adds it to the blacklist
 */
export async function logoutService(refreshToken: string) {
  try {
    // Verify the refresh token
    await verifyToken(refreshToken, 'refresh');

    // Add to blacklist to prevent future use
    addToBlacklist(refreshToken);

    return {
      message: 'Logged out successfully',
    };
  } catch (error: any) {
    // Even if token is invalid/expired, allow logout to proceed to ensure users can always logout
    return {
      message: 'Logged out successfully (token was invalid)',
    };
  }
}
