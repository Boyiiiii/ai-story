"use client";
import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import React, { useEffect, useState } from "react";
import { desc } from "drizzle-orm";
import { StoryItemType } from "../dashboard/_components/UserStoryList";
import StoryItemCard from "../dashboard/_components/StoryItemCard";
import { Button } from "@nextui-org/button";
import { off } from "process";

const ExploreMore = () => {
  const [offset, setOffset] = useState(0);
  const [storyList, setStoryList] = useState<StoryItemType[]>([]);
  useEffect(() => {
    GetAllStories(0);
  });
  const GetAllStories = async (offset: number) => {
    setOffset(offset);
    const result: any = await db
      .select()
      .from(StoryData)
      .orderBy(desc(StoryData.id))
      .limit(8)
      .offset(offset);
    setStoryList(result);
  };
  return (
    <div className="min-h-screen p-10 md:px-20 lg:px-40">
      {" "}
      <h2 className="font-bold text-4xl text-primary text-center">
        Explore More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
        {storyList?.map((item, index) => (
          <StoryItemCard story={item} />
        ))}
      </div>
      <div className="text-center mt-10">
        <Button
          className=""
          color="primary"
          onClick={() => GetAllStories(offset + 8)}
        >
          Load More
        </Button>
      </div>
    </div>
  );
};

export default ExploreMore;
