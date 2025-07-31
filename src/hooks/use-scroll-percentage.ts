"use client";

import { useState, useEffect } from "react";

export const useScrollPercentage = (threshold: number = 80) => {
  const [hasScrolledPastThreshold, setHasScrolledPastThreshold] =
    useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percentage = (scrollTop / documentHeight) * 100;

      setScrollPercentage(percentage);
      setHasScrolledPastThreshold(percentage >= threshold);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return { hasScrolledPastThreshold, scrollPercentage };
};
