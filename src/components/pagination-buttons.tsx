"use client";
import React, { useMemo } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useUrlBuilder } from "@/hooks/use-url-buider";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type PaginationButtonProps = {
  current_page: number;
  MAX_PAGE: number;
};

const PaginationButtons = ({
  current_page,
  MAX_PAGE,
}: PaginationButtonProps) => {
  const router = useRouter();
  const { constructUrl } = useUrlBuilder();
  const MAX_BUTTON_LENGTH = 5;
  const buttonArray = Array.from({ length: MAX_BUTTON_LENGTH });

  const GenerateButtons = useMemo(() => {
    return (
      <>
        <Button
          disabled={current_page == 1}
          onClick={() =>
            router.push(constructUrl({ page: `${current_page - 1}` }))
          }
        >
          <ArrowLeft />
        </Button>

        {current_page > MAX_BUTTON_LENGTH + 1 && (
          <>
            <Button onClick={() => router.push(constructUrl({ page: `${1}` }))}>
              {1}
            </Button>
            ...
          </>
        )}
        {/*Generate 5 - Previous Buttons */}
        {current_page > 5 && (
          <>
            {buttonArray.map((_, idx) => (
              <Button
                onClick={() =>
                  router.push(
                    constructUrl({
                      page: `${current_page - MAX_BUTTON_LENGTH + idx}`,
                    }),
                  )
                }
                variant="outline"
                key={idx}
              >
                {current_page - MAX_BUTTON_LENGTH + idx}
              </Button>
            ))}
          </>
        )}
        {/*Generate 5 - Previous Buttons */}

        {/* Current Page */}
        {<Button disabled>{current_page}</Button>}
        {/* Current Page */}

        {/* Generate + 5 pages button */}
        {current_page <= MAX_PAGE - MAX_BUTTON_LENGTH && (
          <>
            {buttonArray.map((_, idx) => (
              <Button
                onClick={() =>
                  router.push(
                    constructUrl({ page: `${current_page + 1 + idx}` }),
                  )
                }
                key={idx}
              >
                {current_page + 1 + idx}
              </Button>
            ))}
          </>
        )}
        {/* Generate + 5 pages button */}

        {/* Page Jumper to max end */}
        {current_page < MAX_PAGE - MAX_BUTTON_LENGTH && (
          <>
            ...
            <Button
              onClick={() => router.push(constructUrl({ page: `${MAX_PAGE}` }))}
            >
              {MAX_PAGE}
            </Button>
          </>
        )}
        {/* Page Jumper to max end */}

        {/* NEXT PAGE */}
        <Button
          disabled={current_page == MAX_PAGE}
          onClick={() =>
            router.push(constructUrl({ page: `${current_page + 1}` }))
          }
        >
          <ArrowRight />
        </Button>
        {/* NEXT PAGe */}
      </>
    );
  }, [current_page, buttonArray, constructUrl, router, MAX_PAGE]);

  return <>{GenerateButtons}</>;
};

export default PaginationButtons;
