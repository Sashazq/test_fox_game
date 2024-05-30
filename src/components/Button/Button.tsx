interface IButton {
  title: string;
  onClick: () => void;
  isDisabled?: boolean;
}
import "./Button.scss";

export default function Button({ title, onClick, isDisabled = false }: IButton) {
  const clickHandler = () => {
    if (!isDisabled) onClick();
  };

  return (
    <button className={`button ${isDisabled ? "disabled" : "active"}`} disabled={isDisabled} onClick={clickHandler}>
      {title}
    </button>
  );
}
