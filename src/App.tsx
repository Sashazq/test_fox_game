import "./App.css";
import { WelcomeScreen } from "./sections/WelcomeScreen";
import { GameScreen } from "./sections/GameScreen";
import { ScoreBoardScreen } from "./sections/ScoreBoardScreen";
import { SCREENS } from "./config";
import { useRandomImageList } from "./hooks/useRandomImageList";
import ErrorBoundary from "./ErrorBoundary";
import { GameProvider, useGameContext } from "./contexts/GameContext";

const RenderScreen = ({ images, generateNewImages }: any) => {
  const { screenState } = useGameContext();

  return (
    <>
      {screenState === SCREENS.WELCOME && <WelcomeScreen />}
      {screenState === SCREENS.GAME && <GameScreen imageList={images} onImageClick={generateNewImages} />}
      {screenState === SCREENS.SCORE_BOARD && <ScoreBoardScreen />}
    </>
  );
};

function App() {
  const { randomImages, loading, error, generateNewRandomImageList } = useRandomImageList();

  return (
    <ErrorBoundary>
      {loading && <h1>Loading ...</h1>}
      {error && <h1>Error while loading game!</h1>}
      {!loading && (
        <>
          <h1>Click The Fox! Game</h1>
          <GameProvider>
            <RenderScreen images={randomImages} generateNewImages={generateNewRandomImageList} />
          </GameProvider>
        </>
      )}
    </ErrorBoundary>
  );
}

export default App;
