import React from "react";
import { SkeletonProp } from "./type";
import { Skeleton } from "@/components/ui/skeleton";

const ReviewCardSkeleton = ({ num_of_copies }: SkeletonProp) => {
  return (
    <>
      {Array.from({ length: num_of_copies }).map((_, idx) => (
        <figure key={idx} className="review-card">
          <div className="flex items-center gap-2">
            <Skeleton className="mt-2 h-9 w-9 rounded-full" />
            <div className="mb-5 flex flex-col gap-1">
              <Skeleton className="h-4 w-15" />
              <Skeleton className="h-4 w-15" />
            </div>
          </div>
          <Skeleton className="h-4 rounded-none" />

          <div className="mt-3 flex flex-col gap-y-3">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
        </figure>
      ))}
    </>
  );
};

export default ReviewCardSkeleton;
