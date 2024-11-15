import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import { FROG_IDS, FROGS } from "./constants";
import "./index.css";

function getRandomId(min, max) {
  // Ensure min and max are integers
  min = Math.ceil(min);
  max = Math.floor(max);

  // Generate random integer between min and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const TinderSwiper = () => {
  const [cards, setCards] = useState(FROGS);

  const onSwipe = (direction: string, name: string) => {
    console.log(`${name} swiped ${direction}`);
    if (direction === "right") {
      window.open(
        `https://dc7.getfrogs.xyz/necklace/${
          FROG_IDS[getRandomId(0, FROG_IDS.length)]
        }`,
        "_blank"
      );
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

  return (
    <div className="tinder-swiper">
      {cards.map((frog, index) => (
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
    </div>
  );
};
