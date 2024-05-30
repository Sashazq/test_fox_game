import { IImageItem } from "../interfaces";

export const fetchImageData = async <ResponseData>(url: string): Promise<ResponseData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
};

export const loadImage = ({ url, type }: IImageItem) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      return resolve(undefined);
    };
    img.alt = type;
    img.onerror = () => {
      return reject(new Error(`Failed to load image ${url}`));
    };
  });
};
