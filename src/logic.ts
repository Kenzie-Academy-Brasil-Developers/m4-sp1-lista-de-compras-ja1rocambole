import { Request, Response } from "express";
import { List } from "./interface";
import { dataBase, ids } from "./database";

export const createList = (
  { validatedBodyList }: Request,
  response: Response
): Response => {
  const list: List = validatedBodyList;
  const lastId = ids[ids.length - 1];
  const idList = lastId + 1;
  ids.push(idList);

  const listIdentified = { ...list, id: idList };

  dataBase.push(listIdentified);

  return response.status(201).json(listIdentified);
};

export const catchAllList = (request: Request, response: Response) => {
  return response.status(200).json(dataBase);
};

export const catchOneList = (
  { findListIndex }: Request,
  response: Response
): Response => {
  return response.status(200).json(dataBase[findListIndex]);
};

export const updateItemList = (request: Request, response: Response) => {
  const { findListIndex, findItemIndex } = request;

  dataBase[findListIndex].data[findItemIndex] = {
    ...dataBase[findListIndex].data[findItemIndex],
    ...request.body,
  };

  return response.status(200).json(dataBase[findListIndex].data[findItemIndex]);
};

export const deleteOneItem = (
  { findListIndex, findItemIndex }: Request,
  response: Response
) => {
  dataBase[findListIndex].data.splice(findItemIndex, 1);

  return response.status(204).json();
};

export const deleteOneList = (
  { findListIndex }: Request,
  response: Response
) => {
  dataBase.splice(findListIndex, 1);

  return response.status(204).json();
};
