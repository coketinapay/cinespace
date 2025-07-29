import React from "react";
import Image from "next/image";
import { TheMovieDBResult } from "@/types/the-moviedb-api";
import { formatDate } from "@/utils/format-date";
import { Badge } from "./ui/badge";
import { RenderRatingStar } from "./render-rating-star";

export type ShowHeroSectionProps = Pick<
  TheMovieDBResult,
  | "title"
  | "poster_path"
  | "vote_count"
  | "vote_average"
  | "overview"
  | "release_date"
  | "runtime"
  | "genres"
>;
const ShowHeroSection = ({
  poster_path,
  title,
  vote_count,
  vote_average,
  runtime,
  release_date,
  genres,
  overview,
}: ShowHeroSectionProps) => {
  const finalDate = new Date(release_date);

  const roundOffAverage = Math.ceil(vote_average);
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="group relative">
        <Image
          alt={`${title} Logo`}
          width={300}
          height={250}
          priority
          draggable="false"
          src={poster_path}
          className="h-[450px] w-[300px]"
        />
      </div>
      <div aria-label="metadata" className="ml-5 flex flex-col">
        <h1 className="text-2xl font-semibold text-blue-700">{title}</h1>
        <div className="mt-2 flex flex-col space-y-1 space-x-1 text-sm md:flex-row">
          <Badge className="bg-blue-800">{formatDate(finalDate)}</Badge>
          <Badge className="bg-custom-black">{runtime} minutes</Badge>
          {genres?.map((genre) => (
            <Badge variant="outline" key={genre.id}>
              {genre.name}
            </Badge>
          ))}
        </div>
        {vote_count && vote_average && (
          <div className="text-custom-black mt-2 flex gap-2">
            <RenderRatingStar size={20} rating={roundOffAverage} />
            {roundOffAverage} / 10 from&nbsp;
            {vote_count} votes
          </div>
        )}
        <p className="mt-3 max-w-prose font-light">{overview}</p>
      </div>
    </div>
  );
};

export default ShowHeroSection;
