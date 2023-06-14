import { Request, Response, NextFunction } from 'express';

export interface CustomResponse extends Response {
  sendData: (data: any) => void;
  sendError: (statusCode: number, errorMessage: string) => void;
}

export const responseMiddleware = (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  res.sendData = (data: any) => {
    res.status(200).json(data);
  };

  res.sendError = (statusCode: number, errorMessage: string) => {
    res.status(statusCode).json({ error: errorMessage });
  };

  next();
};