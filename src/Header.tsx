import "./index.css";
import FrogIcon from "./assets/frog.svg"; // Path to your frog.svg file
import FlameIcon from "./assets/flag.svg"; // Path to your flame.svg file

export const Header = () => {
  return (
    <header className="frog-tinder-header">
      <img src={FlameIcon} alt="Flame Icon" className="flame-icon" />
      <span className="header-text">Frog</span>
      <img src={FrogIcon} alt="Frog Icon" className="frog-icon" />
      <span className="header-text">Tinder</span>
      <img src={FlameIcon} alt="Flame Icon" className="flame-icon flipped" />
    </header>
  );
};
