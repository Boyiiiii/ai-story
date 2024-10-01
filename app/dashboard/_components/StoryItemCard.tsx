import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Link,
} from "@nextui-org/react";

import { Button } from "@nextui-org/button";
type StoryItemType = {
  story: {
    id: number;
    storyType: string;
    ageGroup: string;
    imageStyle: string;
    userEmail: string;
    userName: string;
    output: [] | any;
    storyId: string;
    storySubject: string;
  };
};

const StoryItemCard = ({ story }: StoryItemType) => {
  return (
    <Link href={"/view-story/" + story?.storyId}>
      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-5 hover:scale-105 transition-all cursor-pointer"
      >
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src="/login.png"
          width={500}
          height={500}
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-black text-xl">{story?.output?.story_name}</p>
          </div>
          <Button className="text-xl" color="primary" radius="full" size="md">
            Read Now!
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default StoryItemCard;
