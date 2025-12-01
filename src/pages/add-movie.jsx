// React Hook Form - Popular library for handling forms in React
// Documentation: https://react-hook-form.com/
// Benefits: Better performance, less re-renders, easier validation
import { useForm } from "react-hook-form";

// Zod Resolver - Connects Zod validation with React Hook Form
// This allows us to use Zod schemas for form validation
import { zodResolver } from "@hookform/resolvers/zod";

// Zod - TypeScript-first schema validation library
// Documentation: https://zod.dev/
// Helps us define what valid form data should look like
import z from "zod";

import { Card } from "@/components/ui/card";
// Form components that work together to create accessible, validated forms
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// Zod Validation Schema - Defines the "shape" and rules for our form data
// This is like a blueprint that says "valid movie data must look like this"
const schema = z.object({
  // Movie name validation
  name: z
    .string({ error: "Movie name is required" }) // Must be a string
    .min(2, "Name must be at least 2 characters"), // Must be at least 2 characters long

  // Description validation
  description: z
    .string({ error: "Description is required" })
    .min(10, "Description must be at least 10 characters"), // Longer minimum for meaningful descriptions

  // Year validation
  year: z.coerce.number({
    // .coerce converts string input to number
    invalid_type_error: "Year must be a number", // Error if conversion fails
    error: "Movie year is required",
  }),

  // Duration validation (in minutes)
  duration: z.coerce.number({
    invalid_type_error: "Duration must be a number",
    error: "Movie duration is required",
  }),

  // Genre ID validation (references genre from dropdown)
  genre_id: z.coerce.number({
    invalid_type_error: "Genre must be a number",
    error: "Movie genre is required",
  }),
});

// Static genre data - In a real app, this would come from an API or database
// Array of objects where each genre has an id and name
const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Drama" },
  { id: 4, name: "Horror" },
  { id: 5, name: "Romance" },
];

// AddMovie Component - Functional component that renders a form to add new movies
export default function AddMovie() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/genre`)
      .then((res) => res.json())
      .then((data) => {
        setGenres(data);
      });
  }, []); //empty depedancy -> run only once when the website is rendered

  // useForm Hook - Sets up React Hook Form with our Zod validation schema
  // This gives us form state management, validation, and submission handling
  const form = useForm({
    resolver: zodResolver(schema), // Connect our Zod schema for validation
  });

  // Form Submission Handler Pattern
  // form.handleSubmit wraps our function and only calls it if validation passes
  // 'data' parameter contains the validated form data
  const onSubmit = form.handleSubmit((data) => {
    console.log(data); // TODO: Send data to API to save the movie
  });

  // JSX Return - Form layout with centered container
  return (
    <div className="w-full flex items-center justify-center">
      {/* Centered container for the form */}
      {/* Form container with responsive width and padding */}
      <div className="min-w-xl max-w-2xl w-full py-16 px-8">
        <h1 className="text-4xl font-bold mb-8">Add New Movie</h1>

        {/* Card wrapper for visual styling */}
        <Card className="p-8">
          {/*
            Form Component - Provides React Hook Form context to all child components
            {...form} is spread operator - passes all form methods and state as props
          */}
          <Form {...form}>
            {/*
              HTML form element with:
              - space-y-6: Adds consistent spacing between form fields
              - noValidate: Disables browser's built-in validation (we use Zod instead)
              - onSubmit: Calls our submission handler when form is submitted
            */}
            <form className="space-y-6" noValidate onSubmit={onSubmit}>
              {/*
                FormField Pattern - Controlled Component Pattern
                This connects the input to React Hook Form's state management

                - control: Links to form's control system
                - name: Must match a field name in our Zod schema
                - render: Function that receives field props and returns JSX
              */}
              <FormField
                control={form.control}
                name="name" // This matches the 'name' field in our Zod schema
                render={(field) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      {/*
                        {...field} spreads field props (value, onChange, onBlur, etc.)
                        This makes the input "controlled" by React Hook Form
                      */}
                      <Input placeholder="Movie name" {...field} />
                    </FormControl>
                    {/* FormMessage automatically shows validation errors for this field */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*
                Responsive Grid for Year and Duration fields:
                - grid-cols-1: Single column on mobile
                - md:grid-cols-2: Two columns side-by-side on medium+ screens
              */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* Year input field */}
                <FormField
                  control={form.control}
                  name="year" // Links to 'year' in Zod schema
                  render={(field) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        {/*
                          type="number" makes this a number input with up/down arrows
                          Browser will show numeric keypad on mobile devices
                        */}
                        <Input placeholder="Year" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="genre_id"
                  render={(field) => (
                    <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <FormControl>
                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select genre" />
                          </SelectTrigger>
                          <SelectContent>
                            {genres.map((genre) => (
                              <SelectItem key={genre.id} value={genre.id}>
                                {genre.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description field - Multi-line text input */}
              <FormField
                control={form.control}
                name="description" // Links to 'description' in Zod schema
                render={(field) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      {/*
                        Textarea - Multi-line text input for longer content
                        rows={5} sets the initial height to 5 lines
                        User can resize it if needed
                      */}
                      <Textarea
                        placeholder="Add a brief description or review of the movie..."
                        rows={5}
                        {...field} // Connects to React Hook Form state
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Form submission section */}
              <div className="flex gap-4">
                {/*
                  Submit Button - type="submit" makes this button submit the form
                  When clicked, it triggers our onSubmit handler
                  Form validation runs automatically before submission
                */}
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Adding..." : "Add Movie"}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
