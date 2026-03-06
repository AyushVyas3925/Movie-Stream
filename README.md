# Cine-Stream - AI-Powered Movie Explorer

A sleek, optimized, and dynamic movie discovery application built with React and Tailwind CSS. It features an infinite-scrolling catalog of popular movies, real-time search debouncing, persistent favorites functionality, and a Google Gemini AI Mood Matcher for personalized recommendations.

---

## 📑 Table of Contents
- [Demo](#-demo)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Installation](#-installation)
- [Usage](#-usage)
- [How It Works](#-how-it-works)
- [Responsive Design](#-responsive-design)
- [Acknowledgments](#-acknowledgments)
- [Contact](#-contact)

---

## 🚀 Demo
Check out the live version here:  
👉 **[Live Demo Link](https://cine-stream-sigma.vercel.app/)** 

---

## ✨ Features

- 🎥 **Infinite Scroll Optimization**: Seamlessly load thousands of movies dynamically as you scroll without crashing the browser or making 100 API calls, using `IntersectionObserver`.
- ⏱️ **Debounced Search**: Save network bandwidth and API quota. The search engine waits exactly 500ms after you finish typing before requesting data from TMDB.
- 🤖 **AI Mood Matcher**: Can't decide what to watch? Type a mood like *"I want a funny movie"* or *"Sci-fi love story"* and Google Gemini AI will intelligently recommend an exact movie title and instantly search for it!
- ❤️ **Persistent Favorites**: Save your favorite movies locally. Your favorites list automatically persists across page reloads and browser sessions using `localStorage` and React Context.
- ⚡ **Native Lazy Loading**: All high-resolution movie posters utilize `loading="lazy"` tags to prevent network bottlenecks.
- 🎨 **Premium UI**: Modern dark-themed, glassmorphism-inspired components with hover animations and custom scrollbars, built cleanly with Tailwind CSS v4.
- 🛡️ **Built-in Error Handling**: Intelligently catches and displays Google API "Quota Exceeded" Rate Limits gracefully directly in the UI without crashing the application.

---

## 🛠 Technologies Used

-   **React**: Component-based UI library for building interactive interfaces.
-   **Vite**: Next-generation frontend tooling for an amazingly fast dev environment.
-   **Tailwind CSS (v4)**: For rapid utility-first styling, gradients, and glassmorphic effects.
-   **Axios**: For structured API requests.
-   **Lucide React**: For sleek, scalable SVG icons (Search, Film, Hearts).
-   **TMDB API**: Serving as the primary movie and poster database.
-   **Google Generative AI (Gemini)**: Powering the intelligent Mood Matcher functionality.

---

## 🚀 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/AyushVyas3925/Movie-Stream.git
    cd week8
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root directory and add your API Keys:
    ```env
    VITE_TMDB_API_KEY=your_tmdb_api_key_here
    VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
    VITE_TMDB_IMAGE_URL=https://image.tmdb.org/t/p/w500
    VITE_GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    *   The app will launch at `http://localhost:5173` (or similar).

5.  **Build for Production**:
    ```bash
    npm run build
    ```

---

## 📖 Usage

1.  **Browse the Catalog**: Scroll down the main page to trigger the Infinite Scroll and uncover hundreds of popular movies.
2.  **Search Specifics**: Use the main search bar to find an exact movie. Enjoy the debounced delay that prevents aggressive reloading!
3.  **Find a Mood**: Click the gold interactive input field on the top right. Type a mood or emotion, wait 1 second, and let the AI find the perfect movie for you.
4.  **Save for Later**: Click the heart icon on any movie poster to add it to your Favorites. Click the 'Favorites' navigation link to view your saved list anytime.

---

## 🧠 How It Works

1.  **Custom Hooks Architecture**: The project cleanly utilizes `useDebounce.js` to manage UI delays, and `useInfiniteScroll.js` to decouple the `IntersectionObserver` logic from the rendering components.
2.  **Global Context**: A single `FavoritesContext.jsx` file wraps the main `<App />` and broadcasts saved movies dynamically to any mounted component that needs it.
3.  **AI Proxy Integration**: User input is sent directly to `getMovieByMoodUsingGemini` inside `api.js`. The response is cleaned and piped straight into the TMDB search query parameters.
4.  **Rate Limit Protection**: Advanced `try/catch` UI blocks in the Home page actively monitor the HTTP status coming from the Gemini endpoint to warn users exactly when they are temporarily rate-limited on free tier accounts.

---

## 📱 Responsive Design

-   **Mobile Layout**: The interface collapses into a 2-column infinite grid, prioritizing touch-friendly sizes for poster cards and favorites buttons.
-   **Desktop Layout**: Expands beautifully into a fluid 5-column grid taking advantage of large widescreen monitors.
-   **Adaptive Navbar**: Flexbox constraints keep the brand logo, search, AI prompter, and navigation elements cleanly aligned regardless of screen width.

---

## 👏 Acknowledgments

-   **The Movie Database (TMDB)**: For providing an exceptional, free movie data API.
-   **Google AI Studio**: For empowering developers with the Gemini Flash models.
-   **Lucide React**: For beautiful open-source iconography.
-   **Prodesk IT Team**: For establishing the Level 1/2/3 requirements for this development challenge.

---

## 📬 Contact

**Ayush Vyas**

-   📧 Email: s.ayushvyas3925@gmail.com
-   🔗 LinkedIn: [Ayush Vyas](https://www.linkedin.com/in/ayush-vyas-287980286/)

---
*Created for the Week 8 React Optimization Project.*
