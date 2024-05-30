import { ROLES } from "../config";

export interface IImageItem {
  url: string;
  type: ImageType;
}

export interface IImageList {
  foxes: IImageItem[];
  cats: IImageItem[];
  dogs: IImageItem[];
}

export type ImageType = (typeof ROLES)[keyof typeof ROLES];
