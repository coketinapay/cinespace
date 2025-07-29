import React from "react";
import LoadingPage from "@/components/loading-page";

const LoadingMovieById = () => {
  return (
    <LoadingPage loading_description="Loading the movie you selected..." />
  );
};

export default LoadingMovieById;
