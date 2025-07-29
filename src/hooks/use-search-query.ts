import { useEffect, useState, useRef } from "react";
import { useDebounce } from "use-debounce";
import { TheMovieDBResponse } from "@/types/the-moviedb-api";
import { getMultiSearchResults } from "@/services/get-multi-search-results";

export const useSearchQuery = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState<
    TheMovieDBResponse | null | undefined
  >(undefined);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedText] = useDebounce(searchValue, 400);
  const [isSearchResultsFetching, setSearchResultsFetching] = useState(false);

  useEffect(() => {
    const fetchQueryResults = async () => {
      let timeOutRef: NodeJS.Timeout;

      if (debouncedText.trim().toLowerCase() === "") {
        setSearchResults(null);
        return;
      }
      setSearchResults(undefined);
      setSearchResultsFetching(true);

      try {
        const res = await getMultiSearchResults(debouncedText);

        const data = (await res.json()) as TheMovieDBResponse;
        console.log(data);

        if (data.total_results > 0) {
          setSearchResults(data);
        } else {
          setSearchResults(null);
        }
      } catch (e: unknown) {
        console.error(e);
        setSearchResults(null);
      } finally {
        setSearchResultsFetching(false);

        timeOutRef = setTimeout(() => {
          inputRef.current?.focus();
        }, 10);
      }

      return () => {
        if (timeOutRef) return clearTimeout(timeOutRef);
      };
    };

    fetchQueryResults();
  }, [debouncedText, hasSearched]);

  return {
    inputRef,
    debouncedText,
    searchValue,
    hasSearched,
    setHasSearched,
    searchResults,
    setSearchResults,
    isSearchResultsFetching,
    setSearchResultsFetching,
    setSearchValue,
  };
};
