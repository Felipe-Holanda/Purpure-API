import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
<<<<<<< HEAD
        id: string;
        isActive: boolean;
      };
=======
        id: string,
        isActive: boolean
      }
>>>>>>> 2d304f271490e405b5231d9097f9c50373992375
    }
  }
}

export {}