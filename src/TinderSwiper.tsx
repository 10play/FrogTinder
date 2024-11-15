import { useState } from "react";
import TinderCard from "react-tinder-card";
import { FROGS } from "./constants";
import "./index.css";

function shuffleArray<T>(array: T[]): T[] {
  // Create a copy of the array to avoid mutating the original
  const arrayCopy = [...array];

  // Shuffle using the Fisher-Yates algorithm
  for (let i = arrayCopy.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      // Swap elements
      [arrayCopy[i], arrayCopy[randomIndex]] = [arrayCopy[randomIndex], arrayCopy[i]];
  }

  return arrayCopy;
}


const shuffledCards = shuffleArray(FROGS)

export const TinderSwiper = () => {
  const [cards, setCards] = useState([...shuffledCards].slice(0, 20));
  const [page, setPage] = useState(1);
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
      setCards(prevCards => {
        const updatedCards = prevCards.filter((frog) => frog.name !== name);
        updatedCards.unshift(shuffledCards[page + 20])
        
        return updatedCards
      });
      
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
      {cards.map((frog) => (
        <TinderCard
          key={frog.id}
          onSwipe={(dir) => onSwipe(dir, frog.name, frog.id)}
          onCardLeftScreen={() => onCardLeftScreen(frog.name)}
          preventSwipe={["up", "down"]}
          className="swipe-card"
        >
          <div className="tinder-card">
            <img src={frog.img} alt={frog.name} className="card-image" />
            <div className="card-name">
             <b>{frog.name}</b> 
            <div className="card-bio">{frog.bio}</div>
            </div>
            
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
