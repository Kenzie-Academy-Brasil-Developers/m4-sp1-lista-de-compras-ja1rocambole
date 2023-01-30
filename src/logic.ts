import { Request, Response } from "express";
import { DataList, List, ListIdentified, ListRequiredKeys } from "./interface";
import { dataBase, ids } from "./database";

//ROTA DE CRIAÇÃO DAS LISTAS
const validateTypeDataList = (payloadData: DataList) => {
  if (
    typeof payloadData.name !== "string" ||
    typeof payloadData.quantity !== "string"
  ) {
    throw new Error(`The list name need to be a string`);
  }
};

const validateTypeList = (payload: List) => {
  if (typeof payload.listName !== "string") {
    throw new Error(`The list name need to be a string`);
  }
};

const validateDataList = (payloadData: DataList) => {
  const payloadDataKeys = Object.keys(payloadData);
  const requiredDataKeys = ["name", "quantity"];

  const hasRequiredDataKeys = requiredDataKeys.every((key) => {
    const includeKey = payloadDataKeys.includes(key);

    return includeKey;
  });

  if (!hasRequiredDataKeys) {
    throw new Error(`Required fields are: "name" and "quantity"`);
  }

  const hasRequiredDataKeysOver = payloadDataKeys.every((key) => {
    const includeKey = requiredDataKeys.includes(key);

    return includeKey;
  });

  if (!hasRequiredDataKeysOver) {
    throw new Error(`Required fields are: "name" and "quantity"`);
  }
};

const validateList = (payload: any): ListIdentified => {
  const payloadKeys: string[] = Object.keys(payload);
  const requiredKeys: ListRequiredKeys[] = ["listName", "data"];

  const hasRequiredKeys = requiredKeys.every((key) => {
    const includeKey = payloadKeys.includes(key);

    return includeKey;
  });

  if (!hasRequiredKeys) {
    throw new Error(`Required fields are: "listName" and "data"`);
  }

  const hasRequiredKeysOver = payloadKeys.every((key) => {
    const includeKey = requiredKeys.includes(key);

    return includeKey;
  });

  if (!hasRequiredKeysOver) {
    throw new Error(`Required fields are: "listName" and "data"`);
  }
  validateTypeList(payload);

  payload.data.forEach((element: DataList) => {
    validateTypeDataList(element);

    validateDataList(element);
  });

  return payload;
};

export const createList = (request: Request, response: Response) => {
  try {
    const validatedBodyList: ListIdentified = validateList(request.body);
    console.log(validatedBodyList);

    const list: List = validatedBodyList;
    const lastId = ids[ids.length - 1];
    const idList = lastId + 1;
    ids.push(idList);

    const listIdentified = { ...list, id: idList };

    dataBase.push(listIdentified);

    return response.status(201).json(listIdentified);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(400).json({ message: error.message });
    }
    console.error(error);
    return response.status(500).json({ message: error });
  }
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
