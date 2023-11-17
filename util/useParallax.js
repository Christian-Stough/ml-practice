import { useState, useEffect } from "react";

export default function useParallax() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(e) {
      setOffset({
        x: (window.innerWidth / 2 - e.clientX) / 90,
        y: (window.innerHeight / 2 - e.clientY) / 90,
      });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return offset;
}
