"use client";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import { StoryData } from "@/config/schema";
import React, { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import StoryPages from "../_components/StoryPages";
import LastPage from "../_components/LastPage";
import { Button } from "@nextui-org/button";
const ViewStory = ({ params }: any) => {
  const [story, setStory] = useState<any>();
  const bookRef = useRef();
  useEffect(() => {
    getStory();
  });

  const getStory = async () => {
    const result = await db
      .select()
      .from(StoryData)
      .where(eq(StoryData.storyId, params.id));
    setStory(result[0]);
  };
  return (
    <div className="p-10 md:px-20 lg:px-40  ">
      <h2 className="font-bold text-4xl text-center p-10 bg-primary text-white">
        {story?.output?.cover_image?.description}
      </h2>
      <div className="relative items-center justify-center flex ">
        {/*@ts-ignore*/}
        <HTMLFlipBook
          width={500}
          height={500}
          className="mt-10"
          useMouseEvents={false}
          ref={bookRef}
        >
          {[...Array(story?.output?.chapters?.length)].map((item, index) => (
            <div key={index} className="bg-white p-10 border w-full">
              <StoryPages storyChapter={story?.output.chapters[index]} />
            </div>
          ))}
        </HTMLFlipBook>
        <div className="absolute -left-20 top-[250px]">
          <Button
            onClick={() => {
              /*@ts-ignore*/
              bookRef.current.pageFlip().flipPrev();
            }}
          >
            Previous
          </Button>
        </div>
        <div className="absolute -right-10 top-[250px]">
          <Button
            onClick={() => {
              /*@ts-ignore*/
              bookRef.current.pageFlip().flipNext();
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewStory;
