import React, { Fragment } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight, UserCheck2 } from "lucide-react";

export type CreditsResponse = {
  id: number;
  cast?: CastProps[];
  crew?: CrewProps[];
};

export type CrewProps = Omit<CastProps, "character"> & {
  job: string;
};

export type CastProps = {
  adult: boolean;
  gender: 1 | 2;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

const CreditCarousel = ({ id, cast }: CreditsResponse) => {
  const showOnlyPreview = cast?.slice(0, 10);

  return (
    <div className="w-full overflow-x-auto scroll-smooth">
      <div className="relative flex gap-5">
        {cast ? (
          showOnlyPreview?.map((person, idx) => (
            <Fragment key={`${id}${idx}`}>
              <figure className="group carousel-card cast-card-img-size">
                <Image
                  src={
                    person.profile_path
                      ? `https://media.themoviedb.org/t/p/w138_and_h175_face/${person.profile_path}`
                      : "/user_placeholder.png"
                  }
                  width={138}
                  height={175}
                  alt={person.name}
                  className="object-fit h-[150px] w-[180px]"
                  loading="lazy"
                  draggable="false"
                  placeholder="blur"
                  blurDataURL="/placeholder.jpg"
                />
                <div className="flex h-[150px] flex-col justify-between p-2">
                  <div>
                    <h1 className="font-medium">{person.name}</h1>
                    <h2 className="text-sm">{person.character}</h2>
                  </div>
                </div>
                <div className="absolute inset-0 z-50 flex h-[300px] w-[180px] flex-col items-center justify-end rounded-md p-2 opacity-0 transition-all duration-300 ease-in-out group-hover:bg-black/20 group-hover:opacity-100">
                  <UserCheck2 size={50} color="white" />
                  <span className="line-clamp-1 p-1 text-sm font-bold text-white">
                    {person.gender == 2 ? "View Actor" : "View Actress"}
                  </span>
                </div>
              </figure>
              {idx == showOnlyPreview.length - 1 && (
                <div className="flex h-[350px] w-[200px] items-center justify-center">
                  <Button variant="link">
                    View All Casts <ArrowRight />
                  </Button>
                </div>
              )}
            </Fragment>
          ))
        ) : (
          <div>No cast available.</div>
        )}
      </div>
    </div>
  );
};

export default CreditCarousel;
