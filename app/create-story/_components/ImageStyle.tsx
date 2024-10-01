"use client";
import React, { useState } from "react";
import Image from "next/image";
import { OptionField } from "./StoryType";
const ImageStyle = ({ userSelection }: any) => {
  const OptionList = [
    {
      label: "3D Cartoon",
      imageUrl: "/3d.png",
      isFree: true,
    },
    {
      label: "Paper Cut",
      imageUrl: "/paper.png",
      isFree: true,
    },
    {
      label: "Watercolor",
      imageUrl: "/watercolor.png",
      isFree: true,
    },
    {
      label: "Pixel Style",
      imageUrl: "/pixel.png",
      isFree: true,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<String>();

  const onUserSelect = (item: OptionField) => {
    setSelectedOption(item.label);
    userSelection({
      fieldValue: item?.label,
      fieldName: "imageStyle",
    });
  };

  return (
    <div>
      <label className="font-bold text-4xl text-primary">4.Image Style</label>
      <div className="grid grid-cols-4 gap-5 mt-3 ">
        {OptionList.map((item, index) => (
          <div
            className={`relative grayscale hover:grayscale-0 cursor-pointer p-1 ${
              selectedOption == item.label
                ? "grayscale-0 border rounded-3xl border-primary"
                : "grayscale"
            }`}
            onClick={() => onUserSelect(item)}
          >
            <h2 className=" absolute  font-bold text-center w-full text-2xl ">
              {item.label}
            </h2>
            <Image
              src={item.imageUrl}
              alt={item.label}
              width={250}
              height={500}
              className="object-cover h-[260px] rounded-3xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageStyle;
