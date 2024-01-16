import { NextFunction, Request, Response } from 'express';

export const ngrokSkipBrowserWarning = (_: Request, res: Response, next: NextFunction) => {
  res.setHeader('ngrok-skip-browser-warning', 'true');
  next();
}