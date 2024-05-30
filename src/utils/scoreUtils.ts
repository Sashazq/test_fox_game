import { ScoreList } from "../interfaces";

export const sortAndRankScores = (scores: ScoreList): ScoreList => {
  return [...scores].sort((a, b) => b.score - a.score).map((score, index) => ({ ...score, rank: index + 1 }));
};

export const getFormattedDateString = (): string => {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };

  const [monthAndDay, year] = currentDate.toLocaleDateString("en-US", options).split(",");

  return `${year}, ${monthAndDay}`;
};
