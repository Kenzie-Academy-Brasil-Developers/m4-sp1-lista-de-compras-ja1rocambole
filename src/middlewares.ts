import { NextFunction, Request, Response } from "express";
import { dataBase } from "./database";
import { DataList, ListRequiredKeys } from "./interface";

export const validateList = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const keys: string[] = Object.keys(request.body);
  const requiredKeys: ListRequiredKeys[] = ["listName", "data"];

  const hasRequiredKeys = requiredKeys.every((key) => {
    const includeKey = keys.includes(key);

    return includeKey;
  });

  if (!hasRequiredKeys) {
    return response
      .status(400)
      .json({ message: 'Required fields are: "listName" and "data"' });
  }

  const hasRequiredKeysOver = keys.every((key) => {
    const includeKey = requiredKeys.includes(key);

    return includeKey;
  });

  if (!hasRequiredKeysOver) {
    return response
      .status(400)
      .json({ message: 'Required fields are: "listName" and "data"' });
  }
  if (typeof request.body.listName !== "string") {
    return response
      .status(400)
      .json({ message: "The list name need to be a string" });
  }

  request.body.data.forEach((element: DataList) => {
    if (
      typeof element.name !== "string" ||
      typeof element.quantity !== "string"
    ) {
      return response
        .status(400)
        .json({ message: "The list name need to be a string" });
    }

    const payloadDataKeys = Object.keys(element);
    const requiredDataKeys = ["name", "quantity"];

    const hasRequiredDataKeys = requiredDataKeys.every((key) => {
      const includeKey = payloadDataKeys.includes(key);

      return includeKey;
    });

    if (!hasRequiredDataKeys) {
      return response
        .status(400)
        .json('Required fields are: "name" and "quantity"');
    }

    const hasRequiredDataKeysOver = payloadDataKeys.every((key) => {
      const includeKey = requiredDataKeys.includes(key);

      return includeKey;
    });

    if (!hasRequiredDataKeysOver) {
      return response
        .status(400)
        .json('Required fields are: "name" and "quantity"');
    }
  });

  const { listName, data } = request.body;

  request.validatedBodyList = {
    listName,
    data,
  };

  next();
};

export const ensureListExists = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const { id } = request.params;

  const findList: number = dataBase.findIndex((list) => list.id === Number(id));

  if (findList === -1) {
    return response
      .status(404)
      .json({ message: `List with id ${id} does not exist` });
  }

  request.findListIndex = findList;

  next();
};

export const validateItemList = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const item: DataList = request.body;

  const { itemName } = request.params;

  const dataList = dataBase[request.findListIndex];

  const findItem = dataList.data.findIndex((list) => list.name === itemName);

  if (request.method === "DELETE") {
    request.findItemIndex = findItem;

    if (findItem === -1) {
      return response
        .status(404)
        .json({ message: `Item with name ${itemName} does not exist` });
    }

    next();
  }
  const keys = Object.keys(request.body);
  const requiredDataKeys = ["name", "quantity"];

  const hasRequiredDataKeys = keys.some((key) => {
    const includeKey = requiredDataKeys.includes(key);

    return includeKey;
  });

  if (!hasRequiredDataKeys) {
    return response
      .status(400)
      .json('Required fields are: "name" and "quantity"');
  }

  const hasRequiredDataKeysOver = keys.every((key) => {
    if (key === "name") {
      return true;
    }
    if (key === "quantity") {
      return true;
    }
  });

  if (!hasRequiredDataKeysOver) {
    return response
      .status(400)
      .json('Required fields are: "name" and "quantity"');
  }

  if (findItem === -1) {
    return response
      .status(404)
      .json({ message: `Item with name ${itemName} does not exist` });
  }

  if (item.name) {
    if (typeof item.name !== "string") {
      return response
        .status(400)
        .json({ message: "The list name need to be a string" });
    }
  }

  if (item.quantity) {
    if (typeof item.quantity !== "string") {
      return response
        .status(400)
        .json({ message: "The list name need to be a string" });
    }
  }

  request.findItemIndex = findItem;

  next();
};
