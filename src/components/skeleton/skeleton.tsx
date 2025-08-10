import { cn } from "@/lib/utils";
import React from "react";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-gray-200 rounded-full dark:bg-gray-700 h-2 w-10 animate-pulse",
        className
      )}
    />
  );
}

export default Skeleton;
