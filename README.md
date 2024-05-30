# Fox Game

A little game in the browser where you click the fox as many times as you can within 30 seconds. The game features a 3x3 grid of randomly generated images. Clicking a fox increases your score, while clicking a cat or dog decreases it. The game preloads images for smooth gameplay and features a scoreboard screen after the game ends.

## Getting Started

## Prerequisites

- Node.js (>= 20.x)
- npm or yarn

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/fox_game.git
    cd fox_game
    ```
3. Use the appropriate Node.js version:    
    ```bash 
    nvm use
    ```

2. Install dependencies:
    ```bash 
    npm install
    # or
    yarn install
    ```
  
## Running the Project
  To start the development server, run:
  ```bash
  npm run dev
  # or
  yarn dev
  ```
  
### Running the Project
To build the project for production, run:
```bash
npm run build
# or
yarn build
```
This will create a dist directory with the production build of your application.

### Linting
To lint the codebase, run:
```bash
npm run lint
# or
yarn lint
```
This will run ESLint on your project and show any linting errors or warnings.

## Formatting with Prettier
To format the codebase with Prettier, run:
```bash
npm run prettier:format
# or
yarn prettier:format
```

This command will format all the code in the project according to Prettier's rules.

To check the code formatting without making changes, run:
```bash
npm run prettier:check
# or
yarn prettier:check
```

## Testing
To run the tests, run:
```bash
npm run test
# or
yarn test
```

This will run all the tests using Vitest.

## Mock Server
The project uses msw (Mock Service Worker) to mock API responses for integration tests. 

