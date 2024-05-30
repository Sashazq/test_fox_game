import { ScoreList } from "../interfaces";

type StorageKey = string;

export const loadScoresFromLocalStorage = (key: StorageKey): ScoreList => {
  try {
    const storedScores = localStorage.getItem(key);
    return storedScores ? JSON.parse(storedScores) : [];
  } catch (error) {
    throw new Error("Failed to load scores from local storage.");
  }
};

export const saveScoresToLocalStorage = (key: StorageKey, newScores: ScoreList): void => {
  try {
    localStorage.setItem(key, JSON.stringify(newScores));
  } catch (error) {
    throw new Error("Failed to save scores to local storage.");
  }
};
