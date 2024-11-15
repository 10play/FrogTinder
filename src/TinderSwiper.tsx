import { useState } from "react";
import TinderCard from "react-tinder-card";
import { FROG_IDS, FROGS } from "./constants";
import "./index.css";

function getRandomId(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const TinderSwiper = () => {
  const [cards, setCards] = useState(FROGS);
  const [showFallbackPopup, setShowFallbackPopup] = useState(false);
  const [fallbackData, setFallbackData] = useState<{
    name: string;
    url: string;
  } | null>(null);

  const onSwipe = (direction: string, name: string) => {
    console.log(`${name} swiped ${direction}`);
    if (direction === "right") {
      console.log("Opening necklace generator");
      const url = `https://dc7.getfrogs.xyz/necklace/${
        FROG_IDS[getRandomId(0, FROG_IDS.length - 1)]
      }`;

      const newTab = window.open(url, "_blank");

      if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
        // Fallback for iOS: Show a popup with a button
        setFallbackData({ name, url });
        setShowFallbackPopup(true);
      }
    }
  };

  const onCardLeftScreen = (name: string) => {
    console.log(`${name} left the screen`);
    setTimeout(() => {
      setCards((prevCards) => {
        const updatedCards = prevCards.filter((frog) => frog.name !== name);
        const swipedCard = prevCards.find((frog) => frog.name === name);
        return swipedCard ? [...updatedCards, swipedCard] : updatedCards;
      });
    }, 300);
  };

  const handleFallbackClick = () => {
    if (fallbackData) {
      window.open(fallbackData.url, "_blank");
      setShowFallbackPopup(false);
    }
  };

  return (
    <div className="tinder-swiper">
      {cards.map((frog) => (
        <TinderCard
          key={frog.name}
          onSwipe={(dir) => onSwipe(dir, frog.name)}
          onCardLeftScreen={() => onCardLeftScreen(frog.name)}
          preventSwipe={["up", "down"]}
          className="swipe-card"
        >
          <div className="tinder-card">
            <img src={frog.img} alt={frog.name} className="card-image" />
            <div className="card-name">{frog.name}</div>
          </div>
        </TinderCard>
      ))}
      {showFallbackPopup && fallbackData && (
        <div className="fallback-popup">
          <div className="popup-content">
            <h3 className="popup-title">Open Link for {fallbackData.name}</h3>
            <p className="popup-description">
              You can open the link manually by clicking the button below:
            </p>
            <p className="popup-link">{fallbackData.url}</p>
            <button onClick={handleFallbackClick} className="popup-button">
              Open Link
            </button>
            <button
              onClick={() => setShowFallbackPopup(false)}
              className="popup-button cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
