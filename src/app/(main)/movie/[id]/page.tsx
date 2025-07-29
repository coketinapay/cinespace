import CreditCarousel from "@/components/carousel/credit-carousel";
import { CreditsResponse } from "@/components/carousel/credit-carousel";
import {
  ReviewCardProps,
  ReviewsCarousel,
} from "@/components/carousel/reviews-carousel";
import { RenderRatingStar } from "@/components/render-rating-star";
import ShowsCarousel from "@/components/carousel/shows-carousel";
import ShowHeroSection from "@/components/show-hero-section";
import { TheMovieDBResponse, TheMovieDBResult } from "@/types/the-moviedb-api";
import { notFound } from "next/navigation";
import React from "react";
import { RESOURCE_PATH } from "@/vendors/the-moviedb-api";
import { getMovieById } from "@/services/movie/getMovieById";
import { getMovieCredits } from "@/services/movie/getMovieCredits";
import { getMovieSimilarShows } from "@/services/movie/getMovieSimilarShows";
import { getMovieReviews } from "@/services/movie/getMovieReviews";
import { Metadata, ResolvingMetadata } from "next";

export type MoviePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: MoviePageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;

  if (!id) return notFound();

  const fetchMovie = await getMovieById(id);
  const movieData = (await fetchMovie?.json()) as TheMovieDBResult;
  const parentMetadata = await parent;
  const prevImages = parentMetadata.openGraph?.images || [];
  const { title, overview, poster_path } = movieData;

  const icon = RESOURCE_PATH.poster(poster_path);
  const url =
    process.env.NODE_ENV == "production"
      ? `${process.env.NEXT_PUBLIC_PROD_URL}/movie/${id}`
      : "http://localhost:3000";

  return {
    title: title,
    icons: {
      icon: [
        {
          url: icon,
          type: "image/jpeg",
        },
      ],
    },
    description: overview,
    openGraph: {
      title: title,
      type: "video.movie",
      description: overview,
      url: url,
      siteName: "Cinespace",
      images: [icon],
      ...prevImages,
    },
    twitter: {
      card: "summary_large_image",
      images: [RESOURCE_PATH.poster(poster_path)],
    },
  };
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  if (!id) return notFound();

  const fetchMovie = await getMovieById(id);

  if (!fetchMovie) return notFound();

  const movieData = (await fetchMovie.json()) as TheMovieDBResult;

  const title = movieData.original_title || movieData.name || movieData.title;

  const posterImgUrl = RESOURCE_PATH.poster(movieData.poster_path);

  const fetchReviews = await getMovieReviews(id);

  const reviewsResponse = (await fetchReviews?.json()) as TheMovieDBResponse;

  console.log(reviewsResponse);
  const reviewsData = reviewsResponse.results as ReviewCardProps[];

  const averageVote = Math.round(movieData.vote_average);

  const fetchCredits = await getMovieCredits(id);

  const creditsResponse = (await fetchCredits?.json()) as CreditsResponse;

  const fetchSimilarShows = await getMovieSimilarShows(id);

  const similarShowsData = await fetchSimilarShows?.json();

  return (
    <div className="show-container mt-10 flex min-h-screen flex-col space-y-5">
      <div className="content-box">
        <ShowHeroSection
          genres={movieData.genres}
          poster_path={posterImgUrl}
          title={title}
          overview={movieData.overview}
          vote_average={movieData.vote_average}
          vote_count={movieData.vote_count}
          release_date={movieData.release_date}
          runtime={movieData.runtime}
        />
      </div>
      <div className="content-box">
        <h1 className="content-box-heading">Top Casts</h1>
        <CreditCarousel id={creditsResponse.id} cast={creditsResponse.cast} />
      </div>

      <div className="content-box">
        <h1 className="content-box-heading">Reviews</h1>
        {movieData.vote_count != 0 && (
          <div className="mb-2 flex items-center">
            Average Rating:
            <div className="ml-2 flex gap-1">
              <RenderRatingStar size={18} rating={averageVote} />
              <span className="text-sm">{averageVote} out of 10</span>
            </div>
          </div>
        )}
        <ReviewsCarousel reviews={reviewsData} />
      </div>

      <div className="content-box">
        <h1 className="content-box-heading">Similar movies you may like</h1>

        <ShowsCarousel similarShows={similarShowsData} />
      </div>
    </div>
  );
};

export default page;
