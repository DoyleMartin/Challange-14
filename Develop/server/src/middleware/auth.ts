import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || '';

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      const user = decoded as JwtPayload;
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      return next();
    });
  } else {
    res.sendStatus(401);
    return;
  }
};
