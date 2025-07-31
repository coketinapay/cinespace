"use client";

import React from "react";
import { useUrlBuilder } from "@/hooks/use-url-buider";
import { validSortObjects, ValidSortTypes } from "./page";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname, useRouter } from "next/navigation";

export type UrlBuilder = {
  page?: string;
  sort_by?: ValidSortTypes;
  include_adult?: "true" | "false";
};

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const MovieFilterBox = ({
  sort_by,
  include_adult,
}: {
  sort_by: ValidSortTypes;
  include_adult: "true" | "false";
}) => {
  const { constructUrl } = useUrlBuilder();
  const path = usePathname();
  const pathname = path;
  const router = useRouter();

  console.log(pathname);

  return (
    <div className="flex flex-col gap-y-3">
      <div className="content-box w-[350px]">
        <Accordion className="h-[100px]" type="multiple">
          <AccordionItem value="filter">
            <AccordionTrigger>
              <h1>Sort by:</h1>
            </AccordionTrigger>
            <AccordionContent>
              <Select
                onValueChange={(e) => router.push(constructUrl({ sort_by: e }))}
              >
                <SelectTrigger className="w-[100%]">
                  <SelectValue placeholder={sort_by}>{sort_by}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {validSortObjects.map((item) => (
                      <SelectItem key={item.name} value={item.value}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="content-box">
        <h1>Include Adult</h1>
        <div className="mt-2 flex items-center space-x-2">
          <Switch
            checked={include_adult === "true"}
            onCheckedChange={(checked) =>
              router.push(
                constructUrl({
                  include_adult: checked ? "true" : "false",
                }),
              )
            }
          />
          <Label htmlFor="include-adult">{include_adult}</Label>
        </div>
      </div>
    </div>
  );
};

export default MovieFilterBox;
