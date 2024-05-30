import { useState, useEffect } from "react";
import { useLoadImages } from "./useLoadImages";
import { IImageItem } from "../interfaces";
import { shuffleArray } from "../utils/shuffleUtils";

const useRandomImageList = () => {
  const { images, loading, error } = useLoadImages();
  const [randomImages, setRandomImages] = useState<IImageItem[]>([]);

  const generateNewRandomImageList = () => {
    if (!loading && !error) {
      const { foxes, cats, dogs } = images;
      const combinedCatDogImages = [...cats, ...dogs];
      const shuffledCatDogImages = shuffleArray<IImageItem>(combinedCatDogImages);
      const randomCatOrDogImages = shuffledCatDogImages.slice(0, 8);
      const shuffledFoxImages = shuffleArray<IImageItem>(foxes);
      const randomFoxImage = shuffledFoxImages.slice(0, 1);
      const allRandomImages = shuffleArray<IImageItem>([...randomCatOrDogImages, ...randomFoxImage]);

      setRandomImages(allRandomImages);
    }
  };

  useEffect(() => {
    generateNewRandomImageList();
  }, [loading, error, images]);

  return { randomImages, loading, error, generateNewRandomImageList };
};

export { useRandomImageList };
