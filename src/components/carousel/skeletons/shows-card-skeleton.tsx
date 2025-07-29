import React from "react";
import { Skeleton } from "../../ui/skeleton";
import { SkeletonProp } from "./type";

const ShowsCardSkeleton = ({ num_of_copies }: SkeletonProp) => {
  return (
    <>
      {Array.from({ length: num_of_copies }).map((_, idx) => (
        <div
          key={idx}
          className="carousel-card movie-card-img-size flex flex-col space-y-2"
        >
          <Skeleton className="movie-card-img-size h-[180px] rounded-none" />
          <div className="flex flex-col gap-2 p-2">
            <Skeleton className="h-5 w-17" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      ))}
    </>
  );
};

export default ShowsCardSkeleton;
