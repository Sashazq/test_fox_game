import { test, expect } from "@playwright/test";
import { readFileSync } from "fs";

// Read the image file
const EXAMPLE_IMG_URL = "e2e/assets/img0.jpg";
const imageBuffer = readFileSync(EXAMPLE_IMG_URL);

async function mockAPIRoutes(page) {
  await page.route("https://randomfox.ca/api/v1/**/*", async (route) => {
    const json = {
      images: [
        "http://images.com/foxes/img1.jpg",
        "http://images.com/foxes/img2.jpg",
        "http://images.com/foxes/img3.jpg",
      ],
    };
    await route.fulfill({ json });
  });

  await page.route("https://api.thecatapi.com/v1/images/*", async (route) => {
    const json = [
      { url: "http://images.com/cats/img1.jpg" },
      { url: "http://images.com/cats/img2.jpg" },
      { url: "http://images.com/cats/img3.jpg" },
      { url: "http://images.com/cats/img4.jpg" },
      { url: "http://images.com/cats/img5.jpg" },
      { url: "http://images.com/cats/img6.jpg" },
    ];
    await route.fulfill({ json });
  });

  await page.route("https://api.thedogapi.com/v1/images/*", async (route) => {
    const json = [
      { url: "http://images.com/dogs/img1.jpg" },
      { url: "http://images.com/dogs/img2.jpg" },
      { url: "http://images.com/dogs/img3.jpg" },
      { url: "http://images.com/dogs/img4.jpg" },
      { url: "http://images.com/dogs/img5.jpg" },
      { url: "http://images.com/dogs/img6.jpg" },
    ];
    await route.fulfill({ json });
  });

  await page.route("http://images.com/**/*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "image/jpeg",
      body: imageBuffer,
    });
  });
}

async function clickFox(page) {
  await page.getByAltText("FOX").nth(0).click();
}

async function clickCat(page) {
  await page.getByAltText("CAT").nth(0).click();
}

async function clickDog(page) {
  await page.getByAltText("DOG").nth(0).click();
}

async function validateScoreboardScreen(page) {
  await expect(page.getByText("SCOREBOARD")).toBeVisible({ timeout: 1000 * 60 * 3 });
  await expect(page.getByRole("cell", { name: "1", exact: true })).toBeInViewport();
  await expect(page.getByRole("cell", { name: "2", exact: true })).toBeInViewport();
  await expect(page.getByRole("cell", { name: "Player1" })).toBeInViewport();
  await expect(page.getByRole("button", { name: "To Welcome Screen!" })).toBeInViewport();
  await expect(page.getByRole("heading", { name: "Click The Fox! Game" })).toBeInViewport();
}

async function validateWelcomeScreen(page) {
  await page.getByPlaceholder("Enter Player name").click();
  await page.getByPlaceholder("Enter Player name").fill("Player1");
  await page.getByRole("button", { name: "Play!" }).click();
  await expect(page.getByText("Hello Player1")).toBeInViewport();
  await page.getByRole("button", { name: "Play!" }).click();
  await expect(page.getByText("Time left:[30] second(s)")).toBeInViewport();
}

async function validateGameScreen(page) {
  // Click actions extracted into functions
  await validateScoreValue(page, 0);
  await clickFox(page);
  await validateScoreValue(page, 1);
  await clickFox(page);
  await validateScoreValue(page, 2);
  await clickFox(page);
  await validateScoreValue(page, 3);
  await clickDog(page);
  await validateScoreValue(page, 2);
  await clickCat(page);
  await validateScoreValue(page, 1);
  await clickFox(page);
  await validateScoreValue(page, 2);
}

async function playGame(page) {
  await validateWelcomeScreen(page);
  await validateGameScreen(page);
  await validateScoreboardScreen(page);
}

async function validateScoreValue(page, score: number) {
  await expect(page.getByText(`Score:[${score}]`)).toBeInViewport();
}
test("basic gameplay scenario", async ({ page }) => {
  await mockAPIRoutes(page);
  await page.goto("/");
  test.setTimeout(1000 * 60 * 3);
  // loading images
  await expect(page.getByText("Loading")).toBeVisible();
  // main scenario
  await playGame(page);

  // we on scoreboard screen , user click on To Welcome Screen button
  await expect(page.getByRole("button", { name: "To Welcome Screen!" })).toBeInViewport();
  page.getByRole("button", { name: "To Welcome Screen!" }).click();
  await playGame(page);

  // we on scoreboard screen , user click on Play! button
  await expect(page.getByRole("button", { name: "Play!" })).toBeInViewport();
  page.getByRole("button", { name: "Play!" }).click();
  await validateGameScreen(page);
  await validateScoreboardScreen(page);

  await validateScoreboardScreen(page);
});
