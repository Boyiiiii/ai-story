/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "create kids story on description for 5-8 years kids. Educational story, and all images in Paper cut style: story of boy and Magic school, give me 5 chapter, with detailed image text prompt for each of chapter and image prompt for story cover book with story name,all in JSON field format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "story_name": "The Boy Who Went to Magic School",\n  "cover_image": {\n    "description": "A paper-cut image of a young boy, with wide eyes and a curious expression, standing in front of a majestic castle with swirling smoke coming from the chimneys. The castle is adorned with paper-cut stars, moons, and magical symbols. The sky is a gradient of pink and purple, with paper-cut clouds floating above.",\n    "style": "Paper cut"\n  },\n  "chapters": [\n    {\n      "chapter_title": "The Curious Case of the Lost Button",\n      "description": "A paper-cut image of a young boy, named Leo, sitting on his bed, holding a button in his hand. He is looking at the button with a worried expression. Around him, his toys are scattered, some with missing buttons. In the background, a clock is ticking, indicating that it\'s bedtime.",\n      "style": "Paper cut"\n    },\n    {\n      "chapter_title": "The Mysterious Invitation",\n      "description": "A paper-cut image of Leo sleeping soundly in his bed. A bright, swirling paper-cut light shines on him, revealing an envelope with a wax seal and a magical symbol. The envelope is floating above his bed, with paper-cut sparkles surrounding it.",\n      "style": "Paper cut"\n    },\n    {\n      "chapter_title": "Welcome to Magic School",\n      "description": "A paper-cut image of Leo standing in awe at the entrance of a majestic castle, with a paper-cut sign that reads \\"Magic School.\\" The castle is adorned with paper-cut stars, moons, and magical symbols. Students, with paper-cut wings, robes, and wands, are happily entering the castle.",\n      "style": "Paper cut"\n    },\n    {\n      "chapter_title": "Learning the Magic of Buttons",\n      "description": "A paper-cut image of Leo in a classroom filled with paper-cut magical objects. He is surrounded by students, some holding paper-cut buttons that are floating and glowing with magic. A paper-cut teacher, with a long beard and a whimsical hat, is explaining the magic of buttons.",\n      "style": "Paper cut"\n    },\n    {\n      "chapter_title": "The Button\'s True Power",\n      "description": "A paper-cut image of Leo, now a confident young wizard, using the magic of buttons to help his friends and solve problems. The paper-cut image shows him restoring his lost button to his favorite toy and helping others with their own magical button problems.",\n      "style": "Paper cut"\n    }\n  ]\n}\n```\n\n**Explanation of Image Prompts:**\n\n* **Cover Image:** The cover image should be visually appealing and capture the essence of the story. It should create a sense of wonder and excitement, drawing kids into the world of magic.\n* **Chapter Images:** Each chapter image should correspond with the events of the chapter. They should be detailed, with a paper-cut style that adds a unique and whimsical touch to the story.\n\n**Educational Value:**\n\nThe story incorporates learning through:\n\n* **Problem-solving:** Leo uses his imagination and the magic of buttons to solve problems.\n* **Curiosity and Exploration:** The story encourages kids to be curious and explore the world around them.\n* **Friendship and Cooperation:** Leo learns to work with his friends and help others.\n\nThis story will be engaging and educational for kids aged 5-8, fostering their imagination and love for reading. \n',
        },
      ],
    },
  ],
});
