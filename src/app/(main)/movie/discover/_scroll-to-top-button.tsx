"use client";

import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { useScrollPercentage } from "@/hooks/use-scroll-percentage";

export type ScrollToTopButton = {
  href_id: `#${string}`;
  threshold: number;
};

export const ScrollToTopButton = ({
  href_id,
  threshold,
}: ScrollToTopButton) => {
  const { hasScrolledPastThreshold } = useScrollPercentage(threshold);

  if (!hasScrolledPastThreshold) return null;

  return (
    <Link
      href={href_id}
      className="gradient fixed right-5 bottom-3 rounded-md p-3 transition-all duration-300 hover:scale-110"
    >
      <ArrowUp color="white" size={20} />
    </Link>
  );
};
