import { useCallback, useState } from "react";
import "./GameScreen.scss";
import { Score } from "../../components/Score";
import { Timer } from "../../components/Timer";
import { ROLES, SCORE_BOARD_STORAGE_KEY, SCREENS } from "../../config";
import { IImageItem, ImageType } from "../../interfaces";
import { useGameContext } from "../../contexts/GameContext";
import { useScoreBoard } from "../../hooks/useScoreBoard";
import { getFormattedDateString } from "../../utils/scoreUtils";

interface IGameScreen {
  imageList: IImageItem[];
  onImageClick: () => void;
}

export default function GameScreen({ imageList, onImageClick }: IGameScreen) {
  const [score, setScore] = useState(0);
  const { playerName, setScreenState } = useGameContext();
  const { addOrUpdateScore } = useScoreBoard(SCORE_BOARD_STORAGE_KEY);

  const handleImageClick = useCallback(
    (type: ImageType) => {
      return () => {
        onImageClick();
        setScore((prevScore) => (type === ROLES.FOX ? prevScore + 1 : Math.max(prevScore - 1, 0)));
      };
    },
    [onImageClick],
  );
  const onTimerComplete = useCallback(() => {
    const newScoreItem = {
      rank: 0,
      score,
      name: playerName,
      date: getFormattedDateString(),
    };

    addOrUpdateScore(newScoreItem);
    setScreenState(SCREENS.SCORE_BOARD);
  }, [setScreenState, score]);

  return (
    <div className="gameBoard">
      <div className="scoreWrapper">
        <Score value={score} />
        <Timer waitTimeSeconds={30} onTimerComplete={onTimerComplete} />
      </div>

      <div className="gameGrid">
        {imageList.map(({ url, type }) => (
          <div className="item" key={url} onClick={handleImageClick(type)}>
            <img width={150} height={150} src={url} alt={type} />
          </div>
        ))}
      </div>
    </div>
  );
}
