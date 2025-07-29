"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "../ui/navigation-menu";
import { navLinks } from "@/constants/nav-links";
import Link from "next/link";

const DisplayNavLinks = () => {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {navLinks.map((item) => (
          <NavigationMenuItem
            key={item.name}
            className="animate-fade-right animate-duration-500"
          >
            {item.path ? (
              <NavigationMenuLink className="font-semibold" asChild>
                <Link href={item.path}>{item.name}</Link>
              </NavigationMenuLink>
            ) : (
              <>
                <NavigationMenuTrigger className="cursor-pointer bg-transparent">
                  {item.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="">
                  <ul className="grid gap-1 md:w-[200px] lg:w-[500px] lg:grid-cols-2">
                    {item.children?.map((chel) => (
                      <li key={chel.name} className="row-span-3 flex flex-col">
                        <NavigationMenuLink key={chel.name} asChild>
                          <Link
                            className="font-semibold"
                            href={String(chel.path)}
                          >
                            <div className="gradient w-[33px] rounded-full p-2">
                              <chel.Icon color="white" size={30} className="" />
                            </div>

                            <div>{chel.name}</div>
                            <p className="font-light">{chel.description}</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DisplayNavLinks;
