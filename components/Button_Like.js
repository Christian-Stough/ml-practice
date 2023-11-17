import React, { useState } from "react";
import Button from "./Button";
import classNames from "classnames";
import Confetti from "react-dom-confetti";

const confettiConfig = {
  angle: "270",
  spread: "222",
  startVelocity: "16",
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
};

export function Button_Like({ className, handleClick }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleButtonClick = async () => {
    setIsLoading(true);
    await handleClick();
    setIsLoading(false);
    setIsLiked(true);
    setTimeout(() => setIsLiked(false), 3000); // Reset to unliked state after 3 seconds
  };

  return (
    <div className="absolute top-2 left-2">
      <Button
        handleClick={handleButtonClick}
        className={classNames(
          className,
          ` ${isLoading && "bg-neutral-300 text-neutral-500 "} ${
            isLiked &&
            "bg-green-500 hover:bg-green-500 border-green-600 text-white"
          }`
        )}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="spinner" />
        ) : isLiked ? (
          <>
            <span
              role="img"
              aria-label="thumbs-up"
              className={isLiked ? "animate-bounce" : ""}
            >
              👍
            </span>
          </>
        ) : (
          "Like"
        )}
      </Button>
      <div className="absolute top-4 left-20">
        <Confetti active={isLiked} config={confettiConfig} />
      </div>
    </div>
  );
}
