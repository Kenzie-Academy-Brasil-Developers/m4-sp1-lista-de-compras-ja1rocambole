import { NextFunction, Request, Response } from "express";
import { dataBase } from "./database";
import { DataList, List, ListRequiredKeys } from "./interface";

// const validateTypeDataList = (payloadData: DataList) => {
//   if (
//     typeof payloadData.name !== "string" ||
//     typeof payloadData.quantity !== "string"
//   ) {
//     throw new Error(`The list name need to be a string`);
//   }
// };

// const validateTypeList = (payload: List) => {
//   if (typeof payload.listName !== "string") {
//     return `The list name need to be a string`;
//   }
// };

// const validateDataList = (payloadData: DataList) => {
//   const payloadDataKeys = Object.keys(payloadData);
//   const requiredDataKeys = ["name", "quantity"];

//   const hasRequiredDataKeys = requiredDataKeys.every((key) => {
//     const includeKey = payloadDataKeys.includes(key);

//     return includeKey;
//   });

//   if (!hasRequiredDataKeys) {
//     throw new Error(`Required fields are: "name" and "quantity"`);
//   }

//   const hasRequiredDataKeysOver = payloadDataKeys.every((key) => {
//     const includeKey = requiredDataKeys.includes(key);

//     return includeKey;
//   });

//   if (!hasRequiredDataKeysOver) {
//     throw new Error(`Required fields are: "name" and "quantity"`);
//   }
// };

//🤓🤓🤓🤓

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
      .json({ message: `Required fields are: "listName" and "data"` });
  }

  const hasRequiredKeysOver = keys.every((key) => {
    const includeKey = requiredKeys.includes(key);

    return includeKey;
  });

  if (!hasRequiredKeysOver) {
    return response
      .status(400)
      .json({ message: `Required fields are: "listName" and "data"` });
  }
  // validateTypeList(request.body);
  if (typeof request.body.listName !== "string") {
    return response
      .status(400)
      .json({ message: `The list name need to be a string` });
  }

  request.body.data.forEach((element: DataList) => {
    // validateTypeDataList(element);
    if (
      typeof element.name !== "string" ||
      typeof element.quantity !== "string"
    ) {
      return response
        .status(400)
        .json({ message: `The list name need to be a string` });
    }

    // validateDataList(element);
    const payloadDataKeys = Object.keys(element);
    const requiredDataKeys = ["name", "quantity"];

    const hasRequiredDataKeys = requiredDataKeys.every((key) => {
      const includeKey = payloadDataKeys.includes(key);

      return includeKey;
    });

    if (!hasRequiredDataKeys) {
      return response
        .status(400)
        .json(`Required fields are: "name" and "quantity"`);
    }

    const hasRequiredDataKeysOver = payloadDataKeys.every((key) => {
      const includeKey = requiredDataKeys.includes(key);

      return includeKey;
    });

    if (!hasRequiredDataKeysOver) {
      return response
        .status(400)
        .json(`Required fields are: "name" and "quantity"`);
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
