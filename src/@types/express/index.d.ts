import * as express from "express";
import { List } from "../../interface";

declare global {
  namespace Express {
    interface Request {
      validatedBodyList: List;
      findListIndex: number;
    }
  }
}
