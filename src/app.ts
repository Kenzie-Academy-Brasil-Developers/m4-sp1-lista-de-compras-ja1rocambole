import express, { Application, json, Request, Response } from "express";
import { catchAllList, catchOneList, createList, deleteOneList } from "./logic";
import { ensureListExists, validateList } from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/purchaseList", createList);

app.get("/purchaseList", catchAllList);
app.get("/purchaseList/:id", ensureListExists, catchOneList);

app.patch("/purchaseList/:id/");

app.delete("/purchaseList/:id/item", ensureListExists);

const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
