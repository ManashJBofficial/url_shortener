/**
 * SkeletonComponent renders a skeleton UI with Card and Skeleton components from NextUI.
 * It shows a loading state before data is available.
 */
import React from "react";
import { Card, Skeleton, Button } from "@nextui-org/react";

export default function SkeletonComponent() {
  const isLoaded = true;

  return (
    <div className="width-sm">
      <div className="flex flex-col gap-3 ">
        <Card className=" space-y-5 p-4" radius="lg">
          <div className="space-y-3">
            <Skeleton isLoaded={isLoaded} className="w-4/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-gradient-to-r from-amber-500 to-pink-500 opacity-60"></div>
            </Skeleton>
            <Skeleton isLoaded={isLoaded} className="w-3/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-slate-300"></div>
            </Skeleton>
          </div>
        </Card>
      </div>
    </div>
  );
}
