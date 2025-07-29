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
import { getPopularMovies } from "@/services/movie/getPopularMovies";
import { Metadata } from "next";

// ✅ Dynamic SEO metadata generation (runs at build time for static pages)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const movieResponse = await getMovieById(id);

    if (!movieResponse?.ok) {
      return {
        title: "Movie Not Found | Cinespace",
        description: "The requested movie could not be found.",
      };
    }

    const movieData = (await movieResponse.json()) as TheMovieDBResult;
    const title = movieData.original_title || movieData.name || movieData.title;
    const posterUrl = RESOURCE_PATH.poster(movieData.poster_path);
    const description =
      movieData.overview ||
      `Watch ${title} and discover amazing movies on Cinespace.`;

    // Truncate description for meta tags (ideal length: 150-160 chars)
    const metaDescription =
      description.length > 155
        ? description.substring(0, 152) + "..."
        : description;

    const genres = movieData.genres?.map((g) => g.name).join(", ") || "Movie";
    const releaseYear = movieData.release_date
      ? new Date(movieData.release_date).getFullYear()
      : "";
    const rating = movieData.vote_average
      ? Math.round(movieData.vote_average * 10) / 10
      : null;

    return {
      // ✅ Primary SEO tags
      title: `${title}${releaseYear ? ` (${releaseYear})` : ""} | Cinespace`,
      description: metaDescription,

      // ✅ Robots and indexing
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },

      // ✅ Open Graph for social sharing
      openGraph: {
        title: `${title}${releaseYear ? ` (${releaseYear})` : ""}`,
        description: metaDescription,
        url: `https://cinespace.com/movie/${id}`,
        siteName: "Cinespace",
        images: [
          {
            url: posterUrl,
            width: 300,
            height: 450,
            alt: `${title} movie poster`,
          },
        ],
        locale: "en_US",
        type: "video.movie",
      },

      // ✅ Twitter Card
      twitter: {
        card: "summary_large_image",
        title: `${title}${releaseYear ? ` (${releaseYear})` : ""}`,
        description: metaDescription,
        images: [posterUrl],
        creator: "@cinespace",
        site: "@cinespace",
      },

      // ✅ Additional meta tags
      keywords: [
        title,
        "movie",
        "cinema",
        "film",
        "watch online",
        "movie reviews",
        "cast",
        "trailer",
        ...genres.split(", "),
        ...(releaseYear ? [releaseYear.toString()] : []),
      ].join(", "),

      // ✅ Additional meta properties (filter out undefined values)
      other: {
        "movie:title": title,
        "movie:release_date": movieData.release_date,
        ...(movieData.runtime && {
          "movie:duration": `${movieData.runtime} minutes`,
        }),
        ...(rating && { "movie:rating": rating.toString() }),
        "movie:genre": genres,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for movie:", id, error);
    return {
      title: "Movie | Cinespace",
      description: "Discover amazing movies and TV shows on Cinespace.",
    };
  }
}

// ✅ App Router equivalent of getStaticPaths
export async function generateStaticParams() {
  try {
    // Get popular movies to pre-generate at build time
    const popularMovies = await getPopularMovies();

    // Generate params for the first 20 popular movies (adjust as needed)
    return popularMovies.slice(0, 20).map((movie) => ({
      id: (movie as TheMovieDBResult).id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return []; // Return empty array if API fails
  }
}

// ✅ App Router Server Component with data fetching (replaces getStaticProps)
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  if (!id) return notFound();

  // ✅ Parallel data fetching for better performance
  const [fetchMovie, fetchReviews, fetchCredits, fetchSimilarShows] =
    await Promise.allSettled([
      getMovieById(id),
      getMovieReviews(id),
      getMovieCredits(id),
      getMovieSimilarShows(id),
    ]);

  // Handle movie data (required)
  if (fetchMovie.status === "rejected" || !fetchMovie.value) {
    return notFound();
  }

  const movieResponse = fetchMovie.value;
  if (!movieResponse.ok) {
    return notFound();
  }

  const movieData = (await movieResponse.json()) as TheMovieDBResult;

  // Handle optional data with graceful fallbacks
  const reviewsData =
    fetchReviews.status === "fulfilled" && fetchReviews.value
      ? (((await fetchReviews.value.json()) as TheMovieDBResponse)
          .results as ReviewCardProps[])
      : [];

  const creditsData =
    fetchCredits.status === "fulfilled" && fetchCredits.value
      ? ((await fetchCredits.value.json()) as CreditsResponse)
      : { id: 0, cast: [] };

  const similarShowsData =
    fetchSimilarShows.status === "fulfilled" && fetchSimilarShows.value
      ? await fetchSimilarShows.value.json()
      : { results: [] };

  // Derived data
  const title = movieData.original_title || movieData.name || movieData.title;
  const posterImgUrl = RESOURCE_PATH.poster(movieData.poster_path);
  const averageVote = Math.round(movieData.vote_average);

  // ✅ Structured Data (JSON-LD) for rich snippets
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: title,
    description: movieData.overview,
    image: posterImgUrl,
    datePublished: movieData.release_date,
    genre: movieData.genres?.map((g) => g.name),
    duration: movieData.runtime ? `PT${movieData.runtime}M` : undefined,
    aggregateRating:
      movieData.vote_count > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: movieData.vote_average,
            ratingCount: movieData.vote_count,
            bestRating: 10,
            worstRating: 1,
          }
        : undefined,
    productionCompany: movieData.production_companies?.map((company) => ({
      "@type": "Organization",
      name: company.name,
    })),
    url: `https://cinespace.com/movie/${id}`,
  };

  return (
    <>
      {/* ✅ Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

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
          <CreditCarousel id={creditsData.id} cast={creditsData.cast} />
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
    </>
  );
};

export default page;
