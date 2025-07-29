import DisplayNavLinks from "./display-nav-links";
import { PanelsTopLeftIcon } from "lucide-react";
import MobileNav from "./mobile-nav";
import MultiSearchForm from "./multi-search-form/multi-search-form";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10">
      <div className="flex h-15 w-screen items-center gap-3 border-b-1 bg-white p-2 lg:justify-evenly">
        <div className="block lg:hidden">
          <MobileNav>
            <PanelsTopLeftIcon />
          </MobileNav>
        </div>
        <h1 className="text-gradient animate-fade-up animate-duration-500 text-3xl">
          cinespace
        </h1>
        <div className="z-30 hidden lg:relative lg:block">
          <DisplayNavLinks />
        </div>
      </div>
      <MultiSearchForm />
    </nav>
  );
};

export default Navbar;
