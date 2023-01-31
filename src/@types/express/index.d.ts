import * as express from "express";
import { DataList, List } from "../../interface";

declare global {
  namespace Express {
    interface Request {
      validatedBodyList: List;
      findListIndex: number;
      findItemIndex: number;
    }
  }
}
