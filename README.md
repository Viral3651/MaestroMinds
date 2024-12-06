# Frontend Setup for React.js + Vite

This README provides a comprehensive guide for setting up and managing the frontend of our project using React.js and Vite. For dependency management and scripts, we predominantly use Yarn.

## Required Dependencies

To ensure the frontend operates correctly, the following dependencies and tools need to be installed:

1. **Node.js and Yarn**
   - Purpose: Node.js is used as the JavaScript runtime for the project, and Yarn is used as the package manager for installing and managing dependencies.
   - Installation: First, install Node.js (preferably version 16 or higher), and then install Yarn.
     ```sh
     npm install -g yarn
     ```

2. **React**
   - Purpose: React is used for building the user interface of the application.
   - Installation: Installed as part of the initial setup with Vite.

3. **Vite**
   - Purpose: Vite is used as the build tool for faster development and optimized production builds.
   - Installation: Installed during project setup.

4. **React Router**
   - Purpose: React Router is used to handle client-side routing for navigating between different pages in the application.
   - Installation:
     ```sh
     yarn add react-router-dom
     ```

5. **Axios**
   - Purpose: Axios is used to make HTTP requests from the frontend to the backend.
   - Installation:
     ```sh
     yarn add axios
     ```

6. **Testing Library (Jest and React Testing Library)**
   - Purpose: Jest and React Testing Library are used for unit testing and integration testing of components.
   - Installation:
     ```sh
     yarn add --dev jest @testing-library/react @testing-library/jest-dom
     ```

7. **CORS**
   - Purpose: CORS (Cross-Origin Resource Sharing) is handled at the backend, but it's important to configure frontend requests appropriately when working with different origins.
   - Installation: No additional installation required, handled through Axios settings.

8. **Vitest** (Optional)
   - Purpose: Vitest is a Vite-native test runner for faster test execution, similar to Jest.
   - Installation:
     ```sh
     yarn add --dev vitest
     ```

9. **React Icons** (Optional)
   - Purpose: React Icons provides a collection of popular icons to use in the UI.
   - Installation:
     ```sh
     yarn add react-icons
     ```

10. **Tailwind CSS** (Optional)
    - Purpose: Tailwind CSS is used for utility-first styling in the project.
    - Installation:
      ```sh
      yarn add tailwindcss postcss autoprefixer
      npx tailwindcss init -p
      ```

## Initial Setup

1. **If installing through GitHub, Clone the Repository**
   ```sh
   git clone https://github.com/jvillanueva3651/MaestroMinds.git
   Select the origin/master branch, NOT MAIN.
   Navigate to the project directory with cd MaestroMinds.
   ```

2. **Install Dependencies**
   After navigating to the project directory, install all required dependencies using Yarn:
   ```sh
   yarn install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory to store any environment-specific variables such as API URLs. For example:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

If you are missing any dependencies or any errors are generated when running the dev build or tests, the most easiest fix is to use yarn or npm to install every dependency that pops up in an error.

## Running the Development Server

To start the development server, run:
```sh
yarn run dev
```
This will start the Vite server and provide a local development URL, usually `http://localhost:3000`.

## IMPORTANT!!!
You must ensure the frontend and backend are NOT operating on the same port. Doing so will mask any and all requests between each other. If you find they are, the easiest fix is to navigate to the src/backend folder and finding the app.py file. Scroll to the bottom and change the port number to anything but the frontend port.

## Running Tests

To run tests using Jest or Vitest, execute:
```sh
yarn test
```
This command will look for all test files (`.test.js` or `.test.jsx`) and execute them.

A Babel.config.json and/or jest.config.js/jest.setup.js file may be needed. Populate them with the following if they are not already included:

Babel.config.js
{
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ]
  }
  
jest.config.js
export default {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]
};

jest.setup.js
import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}


## Building for Production

To build the frontend for production, run:
```sh
yarn build
```
This will generate optimized assets in the `dist` directory, ready to be served.

## Serving the Production Build

To preview the production build locally, run:
```sh
yarn preview
```

## Common Commands

- **Start Development Server**: `yarn run dev`
- **Run Tests**: `yarn test`
- **Build for Production**: `yarn build`
- **Preview Production Build**: `yarn preview`

## Troubleshooting

- **Dependency Issues**: If you encounter issues related to missing modules, try running `yarn install` again to ensure all dependencies are correctly installed.
- **CORS Errors**: Ensure your backend is properly configured to allow requests from the frontend's origin.
- **Environment Variables**: Verify that the `.env` file is correctly configured and that all variables are loaded.

## Notes

- Use Yarn instead of npm for all package management tasks to avoid conflicts.
- For production, we are considering configuring a reverse proxy (e.g., Nginx) to serve the frontend and backend together.

This document serves as a comprehensive guide for setting up all necessary dependencies and scripts for the frontend React.js environment used in this project.
