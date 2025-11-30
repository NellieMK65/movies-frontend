// React imports - these are core React features
import { StrictMode } from "react"; // StrictMode helps catch bugs in development by running extra checks
import { createRoot } from "react-dom/client"; // New React 18 way to render apps (replaces ReactDOM.render)

// Global styles for the entire application
import "./index.css";

// React Router imports - for handling navigation between pages
// Documentation: https://reactrouter.com/
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// React Hot Toast - library for showing notifications/alerts
// Documentation: https://react-hot-toast.com/
import { Toaster } from "react-hot-toast";

// Our custom components
import Layout from "./components/layout"; // Shared layout wrapper (navigation, etc.)
import Home from "./pages/home"; // Home page component
import AddMovie from "./pages/add-movie"; // Add movie form page

// Router configuration - defines which component to show for each URL path
// createBrowserRouter uses the HTML5 history API for clean URLs (no # in URLs)
const router = createBrowserRouter([
  {
    path: "/", // Root path (homepage)
    element: (
      // Component Composition Pattern: Layout wraps Home component
      // This means Home will be rendered inside Layout (as children prop)
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/add-movie", // Path for add movie page
    element: (
      // Same Layout wrapper pattern - keeps navigation consistent across pages
      <Layout>
        <AddMovie />
      </Layout>
    ),
  },
]);

// React 18 rendering - createRoot is the new way to render React apps
// It finds the HTML element with id="root" and renders our React app inside it
createRoot(document.getElementById("root")).render(
  // StrictMode wrapper helps catch bugs and deprecated features during development
  <StrictMode>
    {/* Toaster component renders notification popups anywhere in the app */}
    <Toaster position="top-right" />

    {/* RouterProvider makes routing available to all components in our app */}
    {/* It uses the router configuration we defined above */}
    <RouterProvider router={router} />
  </StrictMode>
);
