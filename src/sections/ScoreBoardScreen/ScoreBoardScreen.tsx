import { Button } from "../../components/Button";
import { SCORE_BOARD_STORAGE_KEY, SCREENS } from "../../config";
import { useGameContext } from "../../contexts/GameContext";
import { useScoreBoard } from "../../hooks/useScoreBoard";
import "./ScoreBoardScreen.scss";

export default function ScoreBoardScreen() {
  const { scores } = useScoreBoard(SCORE_BOARD_STORAGE_KEY);
  const { setScreenState } = useGameContext();
  const playAgain = () => {
    setScreenState(SCREENS.GAME);
  };

  const redirectToWelcomeScreen = () => {
    setScreenState(SCREENS.WELCOME);
  };
  return (
    <div className="scoreBoardContainer">
      <h1>{"SCOREBOARD"}</h1>
      <div className="scoreBoard">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Date</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((item) => (
              <tr key={item.name}>
                <td>{item.rank}</td>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="controls">
        <Button onClick={redirectToWelcomeScreen} title="To Welcome Screen!!" />
        <Button onClick={playAgain} title="Play!" />
      </div>
    </div>
  );
}
