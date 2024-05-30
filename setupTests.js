import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import { setupServer } from "msw/node";
import { http } from "msw";
import { handlers } from "./mocks/handlers"; // This file will contain your request handlers

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
