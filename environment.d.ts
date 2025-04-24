declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OCR_SPACE_API_KEY: string;
      OPENROUTER_API_KEY: string;
      NODE_ENV: "development" | "production";
    }
  }
}
