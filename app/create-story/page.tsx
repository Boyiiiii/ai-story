"use client";
//@ts-ignore
import uuid4 from "uuid4";
import React, { useContext, useState } from "react";
import StorySubject from "./_components/StorySubject";
import StoryType from "./_components/StoryType";
import AgeGroup from "./_components/AgeGroup";
import ImageStyle from "./_components/ImageStyle";
import { Button } from "@nextui-org/button";
import { chatSession } from "@/config/GeminiAi";
import { db } from "@/config/db";
import { StoryData, Users } from "@/config/schema";
import { CustomLoader } from "./_components/CustomLoader";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "../_context/UserDetailContext";
import { eq } from "drizzle-orm";

const AI_CREATE = process.env.NEXT_PUBLIC_CREATE_STORY_PROMT;

export interface fieldData {
  fieldName: string;
  fieldValue: string;
}

export interface formDataType {
  storySubject: string;
  storyType: string;
  imageStyle: string;
  ageGroup: string;
}

const CreateStory = () => {
  const [formData, setFormData] = useState<formDataType>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const notify = (msg: string) => toast(msg);
  const notifyError = (msg: string) => toast.error(msg);
  const { user } = useUser();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onHandleUserSelection = (data: fieldData) => {
    notify("Choose Selected!");
    setFormData((prev: any) => ({
      ...prev,
      [data.fieldName]: data.fieldValue,
    }));

    // if(formData?.storySubject || formData?.ageGroup || formData?.imageStyle || formData?.storyType)
  };

  const GenerateStory = async () => {
    setLoading(true);
    if (userDetail.credit <= 0) {
      notifyError("Not Enough Credit!");
      return;
    }
    //Generate AI Story
    const FINAL_PROMPT = AI_CREATE?.replace(
      "{ageGroup}",
      formData?.ageGroup ?? ""
    )
      .replace("{storyType}", formData?.storyType ?? "")
      .replace("{storySubject}", formData?.storySubject ?? "")
      .replace("{imageStyle}", formData?.imageStyle ?? "");

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const res: any = await SaveInDB(result?.response.text());
      await updateUserCredit();
      router?.replace("/view-story/" + res[0].storyId);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      notifyError("Server Error!");
      console.log(e);
    }
  };

  const SaveInDB = async (output: string) => {
    const id = uuid4();
    setLoading(true);
    try {
      const result = await db
        .insert(StoryData)
        .values({
          storyId: id,
          ageGroup: formData?.ageGroup,
          imageStyle: formData?.imageStyle,
          storySubject: formData?.storySubject,
          storyType: formData?.storyType,
          output: JSON.parse(output),
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
        })
        .returning({ storyId: StoryData?.storyId });
      setLoading(false);
      return result;
    } catch (e) {
      console.log(e);
      setLoading(false);
      return null;
    }
  };

  const updateUserCredit = async () => {
    const result = await db
      .update(Users)
      .set({
        credit: Number(userDetail?.credit - 1),
      })
      .where(eq(Users.userEmail, user?.primaryEmailAddress?.emailAddress ?? ""))
      .returning({ id: Users.id });
  };

  return (
    <div className="p-10 md:px-20 lg:px-40">
      <h2 className="font-extrabold text-[70px] text-primary text-center">
        CREATE YOUR STORY
      </h2>
      <p className="text-2xl text-primary">
        Unleash the full potential of your creativity with the power of AI.
        Craft stories like never before, as AI becomes your ultimate co-creator,
        turning your imagination into vivid, captivating narratives. Let each
        tale unfold in ways you never imagined, with AI bringing your creative
        visions to life, one enchanting story at a time. Discover a new era of
        storytelling where the only limit is your imagination!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-14">
        {/* Story Subject */}
        <StorySubject userSelection={onHandleUserSelection} />
        {/* Story Type */}
        <StoryType userSelection={onHandleUserSelection} />
        {/* Age Group */}
        <AgeGroup userSelection={onHandleUserSelection} />
        {/* Image Style */}
        <ImageStyle userSelection={onHandleUserSelection} />
      </div>
      <div className="flex justify-center items-center mt-10 w-full flex-col">
        <Button
          disabled={loading}
          color="primary"
          className="p-10 text-2xl w-full"
          onClick={GenerateStory}
        >
          Create Story!
        </Button>
        <span>1 Credit Will Use </span>
      </div>
      <CustomLoader isLoading={loading} />
    </div>
  );
};

export default CreateStory;
