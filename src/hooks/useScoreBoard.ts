import { useState, useEffect, useCallback } from "react";
import { sortAndRankScores } from "../utils/scoreUtils";
import { loadScoresFromLocalStorage, saveScoresToLocalStorage } from "../utils/localStorageUtils";
import { ScoreItem, ScoreList, StorageKey } from "../interfaces";

const useScoreBoard = (key: StorageKey) => {
  const [scores, setScores] = useState<ScoreList>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((message: string) => {
    setError(message);
  }, []);

  const updateScores = useCallback(
    (updatedScores: ScoreList) => {
      saveScoresToLocalStorage(key, updatedScores);
      setScores(updatedScores);
    },
    [key],
  );

  const addOrUpdateScore = useCallback(
    (newScore: ScoreItem) => {
      const existingScoreIndex = scores.findIndex((score) => score.name === newScore.name);
      if (existingScoreIndex !== -1) {
        const updatedScores = [...scores];
        updatedScores[existingScoreIndex] = {
          ...newScore,
          score: Math.max(scores[existingScoreIndex].score, newScore.score),
        };
        updateScores(sortAndRankScores(updatedScores));
      } else {
        const updatedScores = sortAndRankScores([...scores, { ...newScore, rank: 0 }]);
        updateScores(updatedScores);
      }
    },
    [scores, updateScores],
  );

  const removeScore = useCallback(
    (name: string) => {
      const updatedScores = sortAndRankScores(scores.filter((score) => score.name !== name));
      updateScores(updatedScores);
    },
    [scores, updateScores],
  );

  useEffect(() => {
    try {
      const initialScores = loadScoresFromLocalStorage(key);
      setScores(initialScores);
      setLoading(false);
    } catch (error) {
      const { message } = error as Error;
      handleError(message);
    }
  }, [key, handleError]);

  return { scores, loading, error, addOrUpdateScore, removeScore };
};

export { useScoreBoard };
