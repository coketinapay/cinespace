import { TheMovieDBResponse, TheMovieDBResult } from "@/types/the-moviedb-api";
import React, { Fragment } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { RESOURCE_PATH } from "@/vendors/the-moviedb-api";
import { formatDate } from "@/utils/format-date";

export const ShowCard = ({ show }: { show: TheMovieDBResult }) => {
  return (
    <figure key={show.id} className="carousel-card movie-card-img-size">
      <Image
        src={
          show.poster_path
            ? RESOURCE_PATH.poster(show.poster_path)
            : "/placeholder.jpg"
        }
        width={180}
        height={180}
        alt={show.original_title}
        className="object-fit movie-card-img-size h-[180px]"
        loading="lazy"
        placeholder="blur"
        blurDataURL="/loading_img.png"
        draggable="false"
      />
      <div className="mt-1 flex h-auto flex-col justify-between p-2">
        <h1 className="text-sm font-semibold">{show.title}</h1>
        <h2>{formatDate(new Date(show.release_date))}</h2>
      </div>
    </figure>
  );
};

const ShowsCarousel = ({
  similarShows,
}: {
  similarShows: TheMovieDBResponse;
}) => {
  const results = similarShows.results as TheMovieDBResult[];
  const previewTopShows = results.slice(0, 10);

  return (
    <>
      {similarShows.total_results > 0 ? (
        <div className="flex w-full gap-5 overflow-x-auto scroll-smooth">
          {previewTopShows.map((show, idx) => (
            <Fragment key={show.id}>
              <ShowCard show={show} />
              {idx == previewTopShows.length - 1 && (
                <div className="flex h-[350px] w-[200px] items-center justify-center">
                  <Button variant="link">
                    View All Shows <ArrowRight />
                  </Button>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      ) : (
        <div>No similar shows found</div>
      )}
    </>
  );
};

export default ShowsCarousel;
