# Movies App - Frontend

A modern React application for managing your movie collection, built with Vite, React Router, and shadcn/ui components.

## Features

- **Movie Display**: Browse your movie collection with a responsive card layout
- **Add Movies**: Form-based movie entry with validation
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, accessible interface using shadcn/ui components
- **Form Validation**: Client-side validation using Zod schema validation

## Tech Stack

- **React** - Modern React with functional components and hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **React Hook Form** - Efficient form handling
- **Zod** - TypeScript-first schema validation
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Pre-built accessible UI components
- **React Hot Toast** - Toast notifications

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 22 or higher)
- **npm** package manager

## Setup Instructions

### 1. Initial Vite Setup

If starting from scratch, create a new Vite React project. Make sure to use the folder structure discussed in class

```bash
npm create vite@latest frontend
cd frontend
npm install
```

### 2. Install Required Dependencies

Install the core dependencies for this project:

```bash
# React Router for navigation
npm install react-router-dom

# Styling and utilities
npm install tailwindcss @tailwindcss/vite

# Notifications
npm install react-hot-toast
```

### 3. Setup Tailwind CSS

Delete everything inside index.css and replace with:

```css
@import "tailwindcss";
```

Update your `vite.config.js`:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### 4. Setup Path Aliases (only if you will use shadcn)

For cleaner imports, setup path aliases in `vite.config.js`:

```javascript
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

Update your `jsconfig.json` or create one if you do not have it and paste the code below

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 5. Setup shadcn/ui (Optional but Recommended)

Initialize shadcn/ui for pre-built components:

```bash
npx shadcn@latest init
```

Add the components used in this project:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add textarea
npx shadcn@latest add select
npx shadcn@latest add form
```

## Usage

### Viewing Movies

- Navigate to the home page to see your movie collection
- Movies are displayed in a responsive grid layout
- Each movie card shows title, year, genre, rating, and description

### Adding Movies

- Click "Add Movie" in the navigation
- Fill out the form with movie details:
  - **Name**: Movie title (minimum 2 characters)
  - **Year**: Release year (number)
  - **Duration**: Movie length in minutes (number)
  - **Genre**: Select from available genres
  - **Description**: Movie description (minimum 10 characters)
- Form validation will show errors for invalid inputs
- Click "Add Movie" to submit (currently logs to console)

## Architecture & Patterns

This app demonstrates several React best practices:

### Component Patterns

- **Functional Components**: Modern React with hooks
- **Component Composition**: Layout wraps page components
- **Controlled Components**: Form inputs managed by React state

### State Management

- **useState**: For local component state
- **React Hook Form**: For efficient form state management

### Routing

- **React Router**: Client-side navigation
- **Layout Route**: Consistent navigation across pages

### Validation

- **Zod Schemas**: Type-safe form validation
- **React Hook Form Integration**: Seamless validation feedback

## Styling

- **Tailwind CSS**: Utility-first styling approach
- **Responsive Design**: Mobile-first with breakpoints
- **Design System**: Consistent colors and spacing via CSS custom properties
- **Component Library**: shadcn/ui for accessible, pre-styled components

## Learning Resources

### React Concepts

- [React Documentation](https://react.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [React Router](https://reactrouter.com/)

### Styling & UI

- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

### Validation

- [Zod Documentation](https://zod.dev/)

### Build Tools

- [Vite Documentation](https://vitejs.dev/)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Future Enhancements

- Add movie editing functionality
- Implement movie deletion
- Add search and filtering capabilities
- Include movie poster image uploads
- Add user authentication
- Implement movie ratings and reviews

## License

This project is open source and available under the [MIT License](LICENSE).
