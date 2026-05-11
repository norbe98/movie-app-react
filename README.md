# Movie App

A movie discovery web app built with React and TypeScript, powered by The Movie Database (TMDB) API.

## 🎬 Live Demo

https://movie-appx.netlify.app/

## Features

- **Browse popular movies** — discover what's trending
- **Filter by genre** — explore movies by category
- **Movie details** — see ratings, runtime, overview, and watch the trailer
- **Watchlist** — save movies to watch later, stored locally
- **Fully responsive** — works on mobile, tablet, and desktop

## Tech Stack

- **React 18** + **TypeScript**
- **React Router v6** for navigation
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Context API** for state management
- **Vitest** for unit testing
- **Vite** as the build tool

## Run Locally

Clone the repository and install dependencies:

\`\`\`bash
cd movie-app
npm install
\`\`\`

Create a `.env.local` file in the root with your TMDB API key:

\`\`\`
VITE_TMDB_API_KEY=your_api_key_here
\`\`\`

Get a free API key at (https://www.themoviedb.org/settings/api).

Start the development server:

\`\`\`bash
npm run dev
\`\`\`

## Run Tests

\`\`\`bash
npm test
\`\`\`

Unit tests cover the utility functions: poster URL building and random page generation.

## Project Structure

\`\`\`
src/
├── components/       # Reusable components (Navbar, MovieCard, MovieList)
├── context/          # WatchList state with localStorage sync
├── pages/            # Home, Browse, MovieDetails, WatchList, NotFound
├── types/            # TypeScript types
├── utils/            # Helper functions
└── tests/            # Vitest unit tests
\`\`\`

## What I Learned

- Working with REST APIs and handling async data flows
- Building a context-based state management with localStorage persistence
- Creating reusable variant-based components
- Writing testable code by extracting pure functions
- Securing API keys with environment variables