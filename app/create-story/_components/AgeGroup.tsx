"use client";
import React, { useState } from "react";
import Image from "next/image";
import { OptionField } from "./StoryType";

const AgeGroup = ({ userSelection }: any) => {
  const OptionList = [
    {
      label: "0-2 Years",
      imageUrl: "/0-2.png",
      isFree: true,
    },
    {
      label: "3-5 Years",
      imageUrl: "/3-5.png",
      isFree: true,
    },
    {
      label: "5-8 Years",
      imageUrl: "/5-8.png",
      isFree: true,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<String>();

  const onUserSelect = (item: OptionField) => {
    setSelectedOption(item.label);
    userSelection({
      fieldValue: item?.label,
      fieldName: "ageGroup",
    });
  };
  return (
    <div>
      <label className="font-bold text-4xl text-primary">3.Age Group</label>
      <div className="grid grid-cols-3 gap-5 mt-3 ">
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
              width={350}
              height={500}
              className="object-cover h-[260px] rounded-3xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgeGroup;
