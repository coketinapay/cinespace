import {
  Tv,
  Film,
  User2,
  Files,
  Warehouse,
  Trophy,
  Network,
  KeyIcon,
} from "lucide-react";
import { type TheMovieDBMediaTypes } from "@/types/the-moviedb-api";

function getIconByMediaType(media_type: TheMovieDBMediaTypes) {
  const Icons = {
    tv: <Tv color="white" size={15} />,
    movie: <Film color="white" size={15} />,
    person: <User2 color="white" size={15} />,
    collection: <Files color="white" size={15} />,
    company: <Warehouse color="white" size={15} />,
    award: <Trophy color="white" size={15} />,
    network: <Network color="white" size={15} />,
    keyword: <KeyIcon color="white" size={15} />,
  };

  return <div className="gradient rounded-full p-1">{Icons[media_type]}</div>;
}

export default getIconByMediaType;
