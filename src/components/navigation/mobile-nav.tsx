"use client";

import { type ReactNode, useState, MouseEvent } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import { navLinks } from "@/constants/nav-links";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const MobileNav = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleNavClick = (e: MouseEvent<HTMLUListElement>) => {
    console.log(e.target);
    if (!(e.target instanceof HTMLAnchorElement)) return;

    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetTrigger className="flex items-center justify-center">
        {children}
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col space-y-2 p-3 pt-5 pl-8"
      >
        <VisuallyHidden>
          <DialogTitle>Mobile Navbar</DialogTitle>
          <DialogDescription>
            Main navigation menu for mobile devices, accessible via a toggle
            button
          </DialogDescription>
        </VisuallyHidden>
        {navLinks.map((item, idx) => (
          <div key={idx}>
            {item.children ? (
              <ul className="flex flex-col space-y-2" onClick={handleNavClick}>
                <div className="flex items-center space-x-3">
                  {item.name}
                  <ChevronDown size={19} />
                </div>

                {item.children.map((chel) => (
                  <li
                    className="text-muted-foreground ml-2 text-sm"
                    key={chel.name}
                  >
                    {<Link href={String(chel.path)}>{chel.name}</Link>}
                  </li>
                ))}
              </ul>
            ) : (
              <Link
                onClick={() => setSidebarOpen(false)}
                href={String(item.path)}
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
