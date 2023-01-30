import { Request, Response } from "express";
import { DataList, List, ListIdentified, ListRequiredKeys } from "./interface";
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

//ROTA DE LEITURA DAS LISTAS
export const catchAllList = (request: Request, response: Response) => {
  return response.status(200).json(dataBase);
};

//
export const catchOneList = (
  { findListIndex }: Request,
  response: Response
): Response => {
  return response.status(200).json(dataBase[findListIndex]);
};

// ROTA PARA EDIÇÃO
// export const

//ROTA PARA DELETAR

export const deleteOneList = (
  { findListIndex }: Request,
  response: Response
) => {
  dataBase.splice(findListIndex, 1);

  return response.status(204).json();
};
