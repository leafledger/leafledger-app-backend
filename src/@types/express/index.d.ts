import { User } from "@prisma/client";
type SafeUser = Omit<User, "password">;

declare global {
  namespace Express {
    interface Request {
      user?: SafeUser | null;
    }
  }
}

export {}; // Make this file a module to avoid global declaration conflicts
