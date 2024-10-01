import React from "react";

const StoryPages = ({ storyChapter }: any) => {
  const playSpeech = (text: string) => {
    const synth = window?.speechSynthesis;
    const textToSpeech = new SpeechSynthesisUtterance(text);
    synth.speak(textToSpeech);
  };

  return (
    <div>
      <h2 className="text-2xl fontbold text-primary flex justify-between">
        {storyChapter?.chapter_title}
        <span
          className="cursor-pointer"
          onClick={() => playSpeech(storyChapter?.description)}
        >
          Audio
        </span>
      </h2>

      <p className="text-xl p-10 mt-3 rounded- bg-slate-100">
        {storyChapter?.description}
      </p>
    </div>
  );
};

export default StoryPages;
