import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="px-10 md:px-28 lg:px-44 mt-10 md:mt-20 lg:mt-40 h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <h2 className="text-[70px] lg:text-[100px] text-primary font-extrabold py-10">
            Create your own Stories for Kids In Minutes
          </h2>
          <p className="text-2xl text-primary font-light">
            Create personality Stories for your kids with Unlimited imagination!
          </p>
          <Link href={"/create-story"}>
            <Button size="lg" color="primary" className="mt-5 mb-5 text-2xl">
              Create Story
            </Button>
          </Link>
        </div>
        <div>
          <Image src={"/hero.png"} alt="hero" width={700} height={400} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
