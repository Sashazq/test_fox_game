import { useState, useEffect } from "react";
import { IMAGE_API_ENDPOINTS, ROLES } from "../config";
import { IImageItem, IImageList, ImageType } from "../interfaces";
import { fetchImageData, loadImage } from "../utils/imageUtils";
import { useIsMounted } from "./useIsMounted";

type CatsResponseAPIData = { url: string }[];

type DogsResponseAPIData = { url: string }[];

interface FoxesResponseAPIData {
  images: string[];
}

const useLoadImages = () => {
  const [images, setImages] = useState<IImageList>({ cats: [], dogs: [], foxes: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const isMounted = useIsMounted();

  const mapToImageItems = (data: { url: string }[], type: ImageType): IImageItem[] => {
    return data.map((item) => ({ url: item.url, type }));
  };

  const preloadImages = async (imageItems: IImageItem[]) => {
    return Promise.all(imageItems.map(loadImage));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foxData, catData, dogData] = await Promise.all([
          fetchImageData<FoxesResponseAPIData>(IMAGE_API_ENDPOINTS.FOXES),
          fetchImageData<CatsResponseAPIData>(IMAGE_API_ENDPOINTS.CATS),
          fetchImageData<DogsResponseAPIData>(IMAGE_API_ENDPOINTS.DOGS),
        ]);

        const foxImages = foxData.images.map((url: string) => ({ url, type: ROLES.FOX }));
        const catImages = mapToImageItems(catData, ROLES.CAT);
        const dogImages = mapToImageItems(dogData, ROLES.DOG);

        await preloadImages([...foxImages, ...catImages, ...dogImages]);

        setImages({ foxes: foxImages, cats: catImages, dogs: dogImages });
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };
    if (!isMounted()) {
      fetchData();
    }
  }, []);

  return { images, loading, error };
};

export { useLoadImages };
