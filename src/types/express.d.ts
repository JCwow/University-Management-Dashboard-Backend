import type { Request } from 'express';
import type { User } from '../db/schema/auth.js';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export type RateLimitRole = 'admin' | 'teacher' | 'student' | 'guest';
