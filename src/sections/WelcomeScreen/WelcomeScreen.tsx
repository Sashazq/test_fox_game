import { ChangeEvent, useState } from "react";
import { Button } from "../../components/Button";
import { SCREENS } from "../../config";
import { useGameContext } from "../../contexts/GameContext";
import "./WelcomeScreen.scss";

export default function WelcomeScreen() {
  const [name, setName] = useState("");
  const { setPlayerName, setScreenState } = useGameContext();
  const [inputValue, setInputValue] = useState("");

  const onPlayClickHandler = () => {
    if (name.length > 0) {
      setScreenState(SCREENS.GAME);
      setPlayerName(name);
    } else {
      setName(inputValue);
    }
  };
  const resetName = () => {
    setInputValue("");
    setName("");
  };

  const handleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };
  return (
    <div>
      <div>
        {name === "" ? (
          <>
            <label htmlFor="name">Name: </label>
            <input onChange={handleOnchange} type="text" placeholder="Enter Player name" name="name" id="name" />
          </>
        ) : (
          <span className="welcomeMessage" onClick={resetName}>
            {"Hello " + name}
          </span>
        )}
      </div>
      <div className="controls">
        <Button onClick={onPlayClickHandler} isDisabled={inputValue === ""} title="Play!" />
      </div>
    </div>
  );
}
