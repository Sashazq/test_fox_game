// src/__tests__/Game.test.tsx
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import App from "../App";
import MockImage from "../__mocks__/Image";

(global as any).Image = MockImage;
describe("Game Integration Test", () => {
  it("Game flow test with mocked API", async () => {
    const timerValue = 30;
    render(<App />);

    // Ensure preloading happens
    await waitFor(() => expect(screen.getByText(/loading/i)).toBeInTheDocument());

    // Wait for welcome screen to appear after images are preloaded
    await waitFor(() => expect(screen.getByText(/Name/i)).toBeInTheDocument());

    // Enter name and start the game
    fireEvent.change(screen.getByPlaceholderText(/Enter Player name/i), { target: { value: "Player1" } });
    fireEvent.click(screen.getByText(/Play!/i));

    // Wait for welcome screen to appear after name entered
    await waitFor(() => expect(screen.getByText(/Hello Player1/i)).toBeInTheDocument());
    fireEvent.click(screen.getByText(/Play!/i));

    // Verify game screen appears with images
    await waitFor(() => expect(screen.getByText(/time left/i)).toBeInTheDocument());

    // Simulate clicking the images
    fireEvent.click(screen.getAllByAltText("FOX")[0]); // Assuming the first image is a fox

    // Simulate waiting for n seconds
    for (let i = timerValue; i >= 0; i--) {
      await waitFor(() => expect(screen.getByText(new RegExp(`Time left:\\[${i}\\] second`, "i"))).toBeInTheDocument());
    }

    // Wait for game to end and scoreboard to appear
    await waitFor(() => expect(screen.getByText(/SCOREBOARD/i)).toBeInTheDocument());

    // Check the score
    expect(screen.getByText(/Player1/i)).toBeInTheDocument(); // Adjust based on expected score
  });
});
