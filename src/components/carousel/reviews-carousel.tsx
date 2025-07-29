"use client";

import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";
import { RenderRatingStar } from "../render-rating-star";
import CustomTooltip from "../custom-tooltip";
import remarkBreaks from "remark-breaks";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type AuthorDetailsProps = {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number;
};

export type ReviewCardProps = {
  author: string;
  content: string;
  author_details: AuthorDetailsProps;
};

const ReviewCard = ({ author, content, author_details }: ReviewCardProps) => {
  return (
    <figure className="review-card group">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width="32"
          height="32"
          alt={`${author}'s profile picture`}
          src={"/user_placeholder.png"}
          draggable="false"
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {author}
          </figcaption>

          <p className="text-xs font-light dark:text-white/40">
            @{author_details.username}
          </p>
          <div className="mt-1 flex items-center justify-center">
            <span className="text-sm font-medium">Rating:&nbsp;</span>
            {author_details.rating ? (
              <CustomTooltip content={`${author_details.rating} out of 10`}>
                <div className="flex gap-x-1">
                  <RenderRatingStar size={15} rating={author_details.rating} />
                </div>
              </CustomTooltip>
            ) : (
              <span className="text-center text-xs">No rating found</span>
            )}
          </div>
        </div>
      </div>
      <blockquote className="mt-2 line-clamp-5 text-sm">
        <Markdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
        >{`${content}`}</Markdown>
      </blockquote>
    </figure>
  );
};

export type ReviewsProps = {
  reviews: ReviewCardProps[];
};

export function ReviewsCarousel({ reviews }: ReviewsProps) {
  const reviewsCount = reviews.length;

  const hasReviews = reviewsCount > 0;

  if (!hasReviews) return <div>No reviews available yet.</div>;

  const reviewsMoreThanTen = reviewsCount >= 10;

  const midpoint = Math.floor(reviewsCount / 2);

  const firstRow = reviews.slice(0, midpoint);

  const secondRow = reviews.slice(midpoint);

  return (
    <>
      {hasReviews && (
        <>
          {/* Double row will be rendered if its more than Ten */}
          {reviewsMoreThanTen ? (
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
              <Marquee pauseOnHover className="[--duration:50s]">
                {firstRow.map((review, idx) => (
                  <ReviewCard key={`${review.author} ${idx}`} {...review} />
                ))}
              </Marquee>

              <Marquee reverse pauseOnHover className="[--duration:50s]">
                {secondRow.map((review, idx) => (
                  <ReviewCard key={`${review.author} ${idx}`} {...review} />
                ))}
              </Marquee>

              <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r"></div>
              <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l"></div>
            </div>
          ) : (
            // if not more than 5
            <div className="flex flex-wrap gap-3">
              {reviews.map((review) => (
                <ReviewCard key={review.author} {...review} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
