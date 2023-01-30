export interface DataList {
  name: string;
  quantity: string;
}

export type ListRequiredKeys = "listName" | "data" | string;

export interface List {
  listName: string;
  data: DataList[];
}

export interface ListIdentified extends List {
  id: number;
}
