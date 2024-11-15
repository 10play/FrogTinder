import { useState } from "react";
import TinderCard from "react-tinder-card";
import { FROGS } from "./constants";
import "./index.css";

export const TinderSwiper = () => {
  const [cards, setCards] = useState(FROGS.slice(0, 20));
  const [page, setPage] = useState(0);
  const [showFallbackPopup, setShowFallbackPopup] = useState(false);
  const [fallbackData, setFallbackData] = useState<{
    name: string;
    url: string;
  } | null>(null);

  const onSwipe = (direction: string, name: string, id: string) => {
    console.log(`${name} swiped ${direction}`);
    if (direction === "right") {
      console.log("Opening necklace generator");
      const url = `https://dc7.getfrogs.xyz/necklace/${id}`;

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
      setCards(FROGS.slice(page + 1, page + 20));
      setPage((prevPage) => prevPage + 1);
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
      {cards.map((frog, i) => {
        const activeCard = i === 0;
        return (
          <TinderCard
            key={frog.id}
            onSwipe={(dir) => onSwipe(dir, frog.name, frog.id)}
            onCardLeftScreen={() => onCardLeftScreen(frog.name)}
            preventSwipe={["up", "down"]}
            className={activeCard ? "card card--active" : "card"}
          >
            <img
              className="card__image"
              src={frog.img}
              style={{
                maxWidth: "100%",
              }}
            />
            <div>{frog.name}</div>
          </TinderCard>
        );
      })}
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
