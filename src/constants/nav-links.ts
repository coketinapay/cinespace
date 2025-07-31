import {
  CalendarClock,
  Flame,
  PlayCircle,
  Layers,
  Star,
  Sun,
  Tv,
  type LucideIcon,
} from "lucide-react";

export const navLinks: NavLinksBase[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Movies",

    children: [
      {
        Icon: Layers,
        name: "Discover Movies",
        path: "/movie/discover?page=1&sort_by=popularity.asc&include_adult=false",
        description:
          "Explore a curated mix of trending, top rated, and upcoming movies",
      },
      {
        Icon: Flame,
        name: "Popular Movies",
        path: "/movie/popular",
        description: "Browse the most popular movies trending now",
      },
      {
        Icon: PlayCircle,
        name: "Now Playing",
        path: "/movie/now-playing",
        description: "See movies currently playing in theaters",
      },
      {
        Icon: CalendarClock,
        name: "Upcoming Movies",
        path: "/movie/upcoming",
        description: "Check out upcoming movie releases",
      },
      {
        Icon: Star,
        name: "Top Rated Movies",
        path: "/movie/top-rated",
        description: "View the highest-rated movies by users",
      },
    ],
  },
  {
    name: "TV Shows",

    children: [
      {
        Icon: Layers,
        name: "Discover TV Shows",
        path: "/tv/discover",
        description:
          "Uncover new and trending TV series across all genres and networks",
      },
      {
        Icon: Flame,
        name: "Popular TV Shows",
        path: "/tv/popular",
        description: "Explore the most popular TV shows today",
      },
      {
        Icon: Sun,
        name: "Airing Today TV",
        path: "/tv/airing-today",
        description: "Find shows airing on TV today",
      },
      {
        Icon: Tv,
        name: "On TV",
        path: "/tv/on-the-air",
        description: "Discover TV shows currently on the air",
      },
      {
        Icon: Star,
        name: "Top Rated TV Shows",
        path: "/tv/top-rated",
        description: "See the top-rated TV shows by users",
      },
    ],
  },
  {
    name: "Person",
    path: "/person",
  },
];

export type NavLinksBase = {
  name: string;
  path?: string;
  children?: NavLinksChildren[];
};

export type NavLinksChildren = Omit<NavLinksBase, "children"> & {
  Icon: LucideIcon;
  description?: string;
};
