import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User | null;
    }
  }
}

export {}; // Make this file a module to avoid global declaration conflicts
