import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./config/schema.tsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://ai-story_owner:Gsyoz9UhY1XQ@ep-icy-credit-a1rn2r96.ap-southeast-1.aws.neon.tech/ai-story?sslmode=require",
  },
  verbose: true,
  strict: true,
})