# Development Journey & AI Collaboration

This document captures the iterative process of building the **Cine-Stream Movie Explorer**. It reflects the key technical questions, architectural decisions, and debugging sessions I initiated while developing this highly optimized single-page React application.

---

## 🏗️ Level 1: Core API Integration & Setup

**Goal**: Establish the Vite build environment, connect to the TMDB API, and render a responsive grid of popular movies.

### 1. Initial Setup & Tailwind Configuration
> "I need to configure a new Vite + React project named 'cine-stream' using the latest Tailwind CSS v4. Since v4 handles configurations differently, how do I install the `@tailwindcss/vite` plugin, update my `vite.config.js`, and replace the old `@tailwind` directives in my `index.css` with the new `@import 'tailwindcss';` standard?"

### 2. Fetching Popular Movies
> "I have my TMDB API key stored in my `.env` file as `VITE_TMDB_API_KEY`. How do I create a centralized `api.js` Axios service that sets the base URL and consistently injects my API key into every request? Can you help me write an async `getPopularMovies()` function that returns the 'results' array from the `/movie/popular` endpoint?"

### 3. Rendering the Movie Grid
> "Now that I have my TMDB data stored in an array of `movies` state, how do I map over it to render a visually appealing responsive CSS Grid (`grid-cols-2 lg:grid-cols-5`)? I need a `MovieCard` component that displays the movie poster, title, release year, and a star rating using Lucide react icons."

---

## 🛡️ Level 2: Performance Mastery & State Persistence

**Goal**: Enforce strict client-side performance optimizations to protect API quotas and ensure smooth rendering, while also managing global application state.

### 4. Search Bar Debouncing
> "I added a search bar that calls the TMDB Search API on every keystroke, but typing 'Batman' fired 6 different network requests instantly! How do I build a custom `useDebounce` hook that wraps my `searchQuery` state, so it mathematically guarantees no API calls are dispatched until exactly 500 milliseconds *after* the user finishes typing?"

### 5. Infinite Scroll implementation
> "I want to remove pagination 'Next' buttons entirely. When a user scrolls to the absolute bottom of the rendered movie grid, how do I use the native JavaScript `IntersectionObserver` API inside a custom hook (`useInfiniteScroll`) to detect the bottom of the page, intelligently increment the `page` state, and append the new TMDB results to the bottom of my existing array without wiping the current movies?"

### 6. Persisting Global Favorites
> "I want users to be able to click a heart icon on any movie to 'Favorite' it. Since the user might be searching, viewing popular movies, or looking at a dedicated '/favorites' page, how do I setup a global `FavoritesContext` wrap my `<App>` so any component can access the favorites list? Furthermore, how do I securely synchronize this Context state with the browser's `localStorage` so favorites survive page refreshes?"

---

## 🚀 Level 3: Advanced Optimization & AI Integration

**Goal**: Push the limits of the application by integrating live generative AI and resolving complex edge-case bugs like rate limits and missing assets.

### 7. Native Lazy Loading & Image Fallbacks
> "Loading 50 movie posters perfectly on a fast connection is easy, but what if TMDB fails to provide an image path? How do I add `loading=\"lazy\"` to all my images natively for performance, and build a ternary fallback that dynamically inserts a dark, sleek placeholder image from `placehold.co` whenever `movie.poster_path` is null?"

### 8. Integrating the Gemini 'Mood Matcher'
> "I want to install the `@google/generative-ai` SDK and create a 'Mood Matcher' input in the navigation. Instead of searching by exact title, the user types 'I want a funny movie'. How do I securely pass this prompt to `gemini-1.5-flash`, mathematically enforce a random seed to guarantee different suggestions, and strictly format the prompt so the AI returns *only* the raw movie string (no quotes, no dialogue) which I can instantly pipe back into the standard TMDB search function?"

### 9. Intelligently Catching Rate Limit Errors
> "Because the Google AI Free Tier is extremely strict, users aggressively testing the Mood Matcher are hitting '429 Quota Exceeded' errors inside `api.js`, leaving them stuck on a broken page. How do I program a `try/catch` block that identifies this specific API error, throws it up to my `Home.jsx` component, and gracefully renders a red alert banner notifying the user that they must wait 1 minute for their token bucket to refill?"
