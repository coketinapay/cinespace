import { usePathname, useSearchParams } from "next/navigation";
import { UrlBuilder } from "@/app/(main)/movie/discover/_movie-filter-box";

export const useUrlBuilder = () => {
  const pathname = usePathname();
  const search = useSearchParams();

  const constructUrl = ({ page, sort_by, include_adult }: UrlBuilder) => {
    const current_page = page ?? search.get("page");
    const current_sort_by = sort_by ?? search.get("sort_by");
    const current_include_adult = include_adult ?? search.get("include_adult");
    return `${pathname}?page=${current_page}&sort_by=${current_sort_by}&include_adult=${current_include_adult}`;
  };
  return { constructUrl };
};
