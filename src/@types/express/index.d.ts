import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User | null; // or "any" if you prefer for now
    }
  }
}
