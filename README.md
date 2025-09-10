# ReadHaven Frontend

This directory contains the frontend application for ReadHaven, built with React. It provides the user interface for browsing books, viewing details, and accessing book content.

## Technologies Used

-   **React:** A JavaScript library for building user interfaces.
-   **React Router:** Used for declarative routing within the application.
-   **Bootstrap:** A popular CSS framework for responsive and mobile-first front-end web development.
-   **`axios`:** Promise-based HTTP client for making requests to the backend API.

## Components

-   **`App.js`:** The main application component, handling routing and overall layout (navbar, footer).
-   **`BookList.js`:** Displays a list of books, including search functionality, and allows adding random books. Features a skeleton UI for loading states and a placeholder for missing cover images.
-   **`BookDetail.js`:** Shows detailed information about a single book. Features a skeleton UI for loading states and provides a link to view the book's content on an external Gutendex URL.

## Setup

1.  **Navigate to the `frontend` directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the client:**
    ```bash
    npm start
    ```
    The frontend application will typically run on `http://localhost:3000`.

## Production Considerations

When deploying the frontend to a production environment, consider the following:

-   **API URL:** The frontend currently communicates with the backend at `http://localhost:3330`. For production, you must change this to your deployed backend API URL. This is typically done using environment variables.
    *   **Example (Create React App):** You can create a `.env.production` file in the `frontend` directory and add:
        ```
        REACT_APP_BACKEND_URL=https://your-production-backend-api.com
        ```
        Then, in your `axios` calls, use `process.env.REACT_APP_BACKEND_URL` instead of the hardcoded `http://localhost:3330`.
-   **Build Process:** Create a production build of your React application.
    ```bash
    npm run build
    ```
    This will create an optimized `build` folder with static assets ready for deployment.
-   **Serving Static Files:** The `build` folder needs to be served by a web server (e.g., Nginx, Apache) or a static site hosting service (e.g., Netlify, Vercel, GitHub Pages).
-   **Performance Optimization:** The `npm run build` command handles many optimizations (minification, tree-shaking). Further optimizations might include image optimization, lazy loading components, and CDN usage.
-   **Environment Variables:** Similar to the backend, manage environment variables securely in your production deployment platform.