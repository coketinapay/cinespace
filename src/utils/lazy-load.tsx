"use client";
import React from "react";
import { useInView } from "react-intersection-observer";

export type LazyLoadProps = {
  children: React.ReactNode;
  fallback: React.ReactNode; // lowercase
  threshold: number;
  delay?: number;
  rootMargin?: `${number}px`;
  triggerOnce?: boolean;
};

const LazyLoad = ({
  children,
  fallback, // lowercase
  threshold = 0.2,
  delay = 0,
  rootMargin = "0px",
  triggerOnce = true,
}: LazyLoadProps) => {
  const { ref, inView } = useInView({
    threshold: threshold,
    delay: delay,
    triggerOnce: triggerOnce,
    rootMargin: rootMargin,
  });

  return <div ref={ref}>{inView ? children : fallback}</div>;
};

export default LazyLoad;
