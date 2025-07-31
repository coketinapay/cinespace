"use client";

import React, { useState } from "react";
import useFetchTrendingShows from "@/hooks/use-fetch-trending-shows";
import Link from "next/link";
import { TheMovieDBResult } from "@/types/the-moviedb-api";
import getIconByMediaType from "../../get-icons-by-media-type";
import toast from "react-hot-toast";
import { ResultsLoading } from "./results-loading";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useRouter } from "next/navigation";
import { useSearchQuery } from "@/hooks/use-search-query";
import {
  SearchIcon,
  X,
  ChartNoAxesColumnIncreasing,
  SearchX,
} from "lucide-react";

export const ClearSearchValue = ({
  clearSearchValue,
}: {
  clearSearchValue: () => void;
}) => {
  return (
    <div
      onClick={clearSearchValue}
      className="gradient absolute top-[6px] right-3 rounded-full p-1 lg:mr-[470px]"
    >
      <X color="white" size={17} />
    </div>
  );
};

const MultiSearchForm = () => {
  const router = useRouter();
  const [isFocused, setFocused] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(
    () => setFocused(false),
    isFocused,
  );
  const { allTrendingShows, isFetching, error } = useFetchTrendingShows({
    limit: 5,
    shouldFetch: isFocused,
  });

  const {
    inputRef,
    debouncedText,
    searchValue,
    setSearchValue,
    setSearchResults,
    searchResults,
    isSearchResultsFetching,
  } = useSearchQuery();

  const clearSearchValue = () => {
    setSearchResults(null);
    setSearchValue("");
    setFocused(true);
  };

  const handleKeyEnterSearch = (e: React.KeyboardEvent) => {
    if (e.key == "Enter") {
      if (searchValue.trim().length == 0) {
        if (toast) toast.dismiss();
        toast.error("Type something before searching", {
          position: "top-center",
          duration: 60 * 50,
        });
        return;
      }
      setFocused(false);
      router.push(`/search?q=${searchValue}`);
    }
  };

  return (
    <>
      <div className="relative">
        <input
          aria-disabled={isSearchResultsFetching}
          ref={inputRef}
          value={searchValue}
          onFocus={() => setFocused(true)}
          onChange={(e) => {
            if (!isFocused) setFocused(true);
            setSearchValue(e.target.value);
          }}
          onKeyDown={handleKeyEnterSearch}
          className={`placeholder:text-muted-foreground/70 w-[100%] rounded-none border-b-1 bg-white p-2 pl-[35px] text-sm transition-colors duration-500 placeholder:text-sm focus:outline-none aria-disabled:bg-slate-200 lg:px-[500px] lg:placeholder:text-sm`}
          placeholder="Search for movies, TV shows, or people"
          aria-placeholder="Search for movies, TV shows, or people"
        />
        <SearchIcon
          size={17}
          className="absolute top-[10px] ml-[10px] lg:ml-[470px]"
        />
        {searchValue.length > 0 && !isSearchResultsFetching && (
          <ClearSearchValue clearSearchValue={clearSearchValue} />
        )}
      </div>

      {isFocused && (
        // On initial focus/user trying to search something, the top 5 trending shows will be displayed
        <div
          ref={ref}
          className="absolute top-[97px] z-40 max-h-[500px] w-[100%] overflow-x-hidden border-b bg-white text-sm"
        >
          <>
            {searchValue.length == 0 ? (
              <>
                {isFetching ? (
                  <ResultsLoading />
                ) : (
                  <>
                    {error ? (
                      <div className="flex gap-x-1 border-b-1 bg-slate-200 p-5 font-light lg:pl-[470px]">
                        An error occured. Please try again later.
                      </div>
                    ) : (
                      <ul>
                        <li className="flex gap-x-1 border-b-1 bg-slate-200 p-5 font-light lg:pl-[470px]">
                          <ChartNoAxesColumnIncreasing color="black" />
                          <h1 className="text-gradient text-lg">
                            Trending right now
                          </h1>
                        </li>
                        {allTrendingShows?.map((item, idx) => {
                          const trendingItem = item as TheMovieDBResult;
                          return (
                            <Link
                              onClick={() => setFocused(false)}
                              href={`/${trendingItem.media_type}/${trendingItem.id}`}
                              key={`${trendingItem.name} ${idx}`}
                            >
                              <li className="flex flex-col border-b-1 p-2 text-sm font-light hover:bg-slate-100 lg:pl-[470px]">
                                <div className="flex h-[22px] items-center gap-x-3 font-medium">
                                  {getIconByMediaType(trendingItem.media_type)}
                                  <h2 className="line-clamp-1 text-xs">
                                    {trendingItem.title ||
                                      trendingItem.original_title ||
                                      trendingItem.name}
                                  </h2>
                                </div>
                                <p className="my-1 ml-9 line-clamp-1 max-w-[50%] text-xs">
                                  {trendingItem.overview}
                                </p>
                              </li>
                            </Link>
                          );
                        })}
                      </ul>
                    )}
                  </>
                )}
              </>
            ) : (
              //When user search a query, this block will be used showing his search results.
              <>
                {searchValue.length > 0 && isSearchResultsFetching ? (
                  <ResultsLoading />
                ) : (
                  <>
                    {searchResults ? (
                      <>
                        <ul>
                          <li className="flex items-center gap-x-3 border-b-1 bg-slate-200 p-5 text-sm font-light lg:pl-[470px]">
                            <div className="flex text-sm md:text-base lg:text-lg">
                              Search results for: {debouncedText} (
                              {searchResults.total_results})
                            </div>
                          </li>
                          {searchResults.results
                            ?.slice(0, 5)
                            .map((item, idx) => {
                              const searchItem = item as TheMovieDBResult;
                              return (
                                <Link
                                  onClick={() => setFocused(false)}
                                  href={`/${searchItem.media_type}/${searchItem.id}`}
                                  key={`${searchItem.name} ${idx}`}
                                >
                                  <li
                                    key={`${searchItem.name} ${idx}`}
                                    className="flex flex-col border-b-1 p-2 text-sm font-light hover:bg-slate-100 lg:pl-[470px]"
                                  >
                                    <div className="flex h-[22px] items-center gap-x-3 font-medium">
                                      {getIconByMediaType(
                                        searchItem.media_type,
                                      )}
                                      <h2 className="line-clamp-1 text-xs">
                                        {searchItem.title ||
                                          searchItem.original_title ||
                                          searchItem.name}
                                      </h2>
                                    </div>
                                    <p className="my-1 ml-9 line-clamp-1 max-w-[50%] text-xs">
                                      {searchItem.overview}
                                    </p>
                                  </li>
                                </Link>
                              );
                            })}
                          {searchResults.total_results > 5 && (
                            <Link
                              onClick={() => setFocused(false)}
                              href={`/search?q=${searchValue}`}
                              className="text-gradient flex h-13 items-center justify-center border-b-1 p-2 text-sm font-bold"
                            >
                              View All Results
                            </Link>
                          )}
                        </ul>
                      </>
                    ) : (
                      <>
                        {searchResults === null &&
                          !isSearchResultsFetching &&
                          debouncedText.length > 0 && (
                            <div className="text-gradient my-5 mt-4 flex items-center justify-center gap-x-3">
                              <SearchX size="22" color="gray" /> No results
                              found, please try again.
                            </div>
                          )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default MultiSearchForm;
