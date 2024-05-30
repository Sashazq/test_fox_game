export const IMAGE_API_ENDPOINTS = {
  CATS: "https://api.thecatapi.com/v1/images/search?limit=10",
  FOXES: "https://randomfox.ca/api/v1/getfoxes/?count=20",
  DOGS: "https://api.thedogapi.com/v1/images/search?limit=10",
} as const;

export const SCREENS = {
  WELCOME: "WELCOME",
  GAME: "GAME",
  SCORE_BOARD: "SCORE_BOARD",
} as const;

export const ROLES = {
  FOX: "FOX",
  CAT: "CAT",
  DOG: "DOG",
} as const;

export const SCORE_BOARD_STORAGE_KEY = "board";
