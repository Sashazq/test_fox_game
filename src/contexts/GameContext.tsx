import React, { createContext, useState, useContext, ReactNode } from "react";
import { SCREENS } from "../config";

interface GameContextProps {
  playerName: string;
  setPlayerName: (name: string) => void;
  screenState: string;
  setScreenState: (screen: string) => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [playerName, setPlayerName] = useState<string>("");
  const [screenState, setScreenState] = useState<string>(SCREENS.WELCOME);

  return (
    <GameContext.Provider value={{ playerName, setPlayerName, screenState, setScreenState }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
