import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

export type TooltipProps = {
  content: string;
  children: React.ReactNode;
  delayDuration?: number;
};

const CustomTooltip = ({ content, children, delayDuration }: TooltipProps) => {
  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
};

export default CustomTooltip;
