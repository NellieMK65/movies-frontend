// React hook for managing component state
import { useState } from "react";

// Pre-built UI components (from shadcn/ui library)
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Sample movie data - In a real app, this would come from an API or database
// JavaScript Object - represents a single movie with its properties
const movie = {
  id: 1,
  title: "Inception",
  year: 2010,
  genre: "Sci-Fi",
  rating: 8.8,
  description:
    "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
};

// Home Component - Functional component that displays a list of movies
export default function Home() {
  // useState Hook Pattern: [currentValue, setterFunction] = useState(initialValue)
  // 'movies' is our state variable, 'setMovies' is the function to update it
  // We start with an array containing the same movie 4 times (temporary data)
  const [movies, setMovies] = useState([movie, movie, movie, movie]);

  // JSX Return - This is what the component renders to the screen
  return (
    <div>
      {/* Page title */}
      <h1 className="text-4xl font-bold mb-8">My Movies</h1>

      {/*
        Responsive Grid Layout (CSS Grid with Tailwind):
        - grid-cols-1: 1 column on mobile
        - md:grid-cols-2: 2 columns on medium screens (tablets)
        - lg:grid-cols-4: 4 columns on large screens (desktops)
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/*
          Array.map() Pattern - Core React pattern for rendering lists
          For each movie in our movies array, create a Card component

          Note: We use underscore (_) for the first parameter because we're not using the individual movie object
          We're using the 'index' parameter to have unique keys

          Important: Each item in a list needs a unique 'key' prop for React's reconciliation
        */}
        {movies.map((_, index) => (
          <Card
            key={movie.id} // Unique identifier for React (should be unique per item)
            className="flex flex-col gap-4 p-6 hover:border-primary transition-colors"
          >
            {/* Movie header section */}
            <div>
              {/*
                JSX Expression Pattern: {movie.title}
                Curly braces {} let us insert JavaScript expressions into JSX
              */}
              <h2 className="text-xl font-bold text-foreground mb-2">
                {movie.title}
              </h2>

              {/* Movie metadata badges */}
              <div className="flex gap-2 mb-2">
                <span className="text-sm px-3 py-1 bg-secondary rounded-full text-white">
                  {movie.year}
                </span>
                <span className="text-sm px-3 py-1 bg-secondary rounded-full text-white">
                  {movie.genre}
                </span>
              </div>
            </div>

            {/* Movie rating section */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-700">
                {movie.rating}
              </span>
              <span className="text-muted-foreground">/10</span>
            </div>

            {/* Movie description */}
            <p className="text-sm text-muted-foreground line-clamp-3">
              {movie.description}
            </p>

            {/*
              Delete button - Currently commented out onClick handler
              In a real app, this would delete the movie from state/database
            */}
            <Button
              variant="destructive" // Pre-defined style variant (red/danger styling)
              // onClick={() => deleteMovie(movie.id)} // TODO: Implement delete functionality
              className="mt-auto hover:cursor-pointer" // mt-auto pushes button to bottom of card
            >
              Delete
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
