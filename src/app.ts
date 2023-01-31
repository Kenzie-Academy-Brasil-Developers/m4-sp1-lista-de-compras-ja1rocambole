import express, { Application, json } from "express";
import {
  catchAllList,
  catchOneList,
  createList,
  deleteOneItem,
  deleteOneList,
  updateItemList,
} from "./logic";
import {
  ensureListExists,
  validateItemList,
  validateList,
} from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/purchaseList", validateList, createList);

app.get("/purchaseList", catchAllList);
app.get("/purchaseList/:id", ensureListExists, catchOneList);

//🚨
app.patch(
  "/purchaseList/:id/:itemName",
  ensureListExists,
  validateItemList,
  updateItemList
);
//🚨

app.delete(
  "/purchaseList/:id/:itemName",
  ensureListExists,
  validateItemList,
  deleteOneItem
);

app.delete("/purchaseList/:id", ensureListExists, deleteOneList);

const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
