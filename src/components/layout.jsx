// React Router imports for navigation and location detection
// Documentation: https://reactrouter.com/
import { Link, useLocation } from "react-router-dom";

// Layout Component - This is a "wrapper" or "container" component
// Pattern: Higher-Order Component (HOC) that wraps other components
// It receives 'children' prop which represents any components placed inside it
export default function Layout({ children }) {
  // useLocation hook gives us information about the current URL
  // Hooks Pattern: React hooks let us use React features in functional components
  // pathname tells us which page we're currently on (e.g., "/", "/add-movie")
  const { pathname } = useLocation();

  return (
    <div>
      {/* Navigation bar - stays consistent across all pages */}
      <nav className="bg-card border-b border-border">
        {/* Container with max width and centered content */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Flexbox: space-between puts logo on left, nav links on right */}
          <div className="flex items-center justify-between">
            {/* Link component from React Router - like <a> but for single-page apps */}
            <Link to="/" className="text-2xl font-bold text-primary">
              Movie App
            </Link>

            {/* Navigation links container */}
            <div className="flex gap-4">
              {/*
                Conditional Styling Pattern: className changes based on current page
                Template literals (``) allow us to insert JavaScript expressions
                Ternary operator (condition ? true : false) for conditional classes
              */}
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  pathname === "/" // If we're on home page
                    ? "bg-primary text-primary-foreground" // Active styles
                    : "text-foreground hover:bg-secondary hover:text-white" // Inactive styles
                }`}
              >
                Movies
              </Link>

              {/* Same conditional styling pattern for Add Movie link */}
              <Link
                to="/add-movie"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  pathname === "/add-movie"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary hover:text-white"
                }`}
              >
                Add Movie
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/*
        Main content area where child components are rendered
        'children' prop contains whatever components are wrapped by Layout
        This is the Component Composition pattern in action
      */}
      <div className="p-3">{children}</div>
    </div>
  );
}
