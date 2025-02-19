import { Request, Response, NextFunction } from "express";
import LOGGER from "../../config/logger/winston";

const logRequests = (req: Request, res: Response, next: NextFunction) => {
  LOGGER.info(`${req.method} ${req.url}`);
  next();
};

export default logRequests;
