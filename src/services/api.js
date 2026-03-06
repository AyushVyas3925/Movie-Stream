import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
});

export const getPopularMovies = async (page = 1) => {
    try {
        const response = await tmdbApi.get('/movie/popular', { params: { page } });
        return response.data;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
    }
};

export const searchMovies = async (query, page = 1) => {
    try {
        const response = await tmdbApi.get('/search/movie', { params: { query, page } });
        return response.data;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};

import { GoogleGenerativeAI } from '@google/generative-ai';

// Actual AI Integration for the "Mood Matcher" using Gemini
export const getMovieByMoodUsingGemini = async (mood) => {
    const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!geminiApiKey || geminiApiKey === 'YOUR_GEMINI_API_KEY_HERE') {
        console.warn("No valid Gemini API key found. Falling back to default suggestion.");
        return 'The Matrix';
    }

    try {
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        // Use standard flash-latest which matches the user's AI Studio Quickstart
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        // Adding randomness to ensure different suggestions for the same mood
        const randomness = Math.floor(Math.random() * 1000);
        const prompt = `Suggest ONE popular movie that fits this mood: '${mood}'. Make sure it's a creative choice (Seed: ${randomness}). Return ONLY the exact movie title as a string. No quotes, no years, no extra text.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let movieTitle = response.text().trim();

        // Clean up any accidental quotes or newlines from the AI
        movieTitle = movieTitle.replace(/["*]/g, '').replace(/\n/g, '');

        return movieTitle || 'The Matrix';
  } catch (error) {
    console.error('CRITICAL AI ERROR:', error.message);
    throw new Error(`Google AI API Error: ${error.message}`);
  }
};

export default tmdbApi;
