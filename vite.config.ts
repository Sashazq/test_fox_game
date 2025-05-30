import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // 👋 add the line below to add jsdom to vite
    environment: "jsdom",
    // hey! 👋 over here
    globals: true,
    setupFiles: "./setupTests.js", // assuming the test folder is in the root of our project
    testTimeout: 60000,
    exclude: ["**/e2e/**", "**/tests-examples/**", "**/node_modules/**"],
  },
});
