import { Star } from "lucide-react";
export const RenderRatingStar = ({
  rating,
  size,
}: {
  rating: number;
  size: number;
}) => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, idx) => (
        <Star key={idx} size={size} fill={idx < rating ? "yellow" : "black"} />
      ))}
    </>
  );
};
