import type { AsyncDictionary } from "@graphorigami/types";

export interface HasGraph {
  toGraph(): AsyncDictionary;
}

export type PlainObject = {
  [key: string]: any;
};

export type GraphVariant =
  Array<any> | 
  AsyncDictionary |
  Function | 
  HasGraph | 
  Map<any, any> | 
  PlainObject | 
  Set<any> | 
  any[];
