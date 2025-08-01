"use client";

import React from "react";
import { useUrlBuilder } from "@/hooks/use-url-buider";
import { validSortObjects, ValidSortTypes } from "./_constants";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePathname, useRouter } from "next/navigation";

export type UrlBuilder = {
  page?: string;
  sort_by?: ValidSortTypes;
  include_adult?: "true" | "false";
};

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { capitalizeFirstCharOfStr } from "@/utils/capitalizeFirstCharOfStr";

const MovieFilterBox = ({
  include_adult,
}: {
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
        <h1 className="my-2 font-medium">Sort Movies</h1>
        <Select
          onValueChange={(e) => router.push(constructUrl({ sort_by: e }))}
        >
          <SelectTrigger className="w-[100%]">
            <SelectValue placeholder="Select sorting type" />
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
      </div>
      <div className="content-box">
        <h1 className="my-2 font-medium">Include Adult Content</h1>
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
          <Label htmlFor="include-adult">
            {capitalizeFirstCharOfStr(include_adult)}
          </Label>
        </div>
      </div>
    </div>
  );
};

export default MovieFilterBox;
