import { useState, useEffect } from 'react';
import { getPopularMovies, searchMovies, getMovieByMoodUsingGemini } from '../services/api';
import MovieCard from '../components/MovieCard';
import useDebounce from '../hooks/useDebounce';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { Film } from 'lucide-react';

const Home = ({ searchQuery, moodQuery }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination State
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Debounced queries (500ms delay)
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const debouncedMoodQuery = useDebounce(moodQuery, 1000); // 1-second delay for AI to save tokens

    // Cache the AI suggestion so pagination works without re-prompting Gemini
    const [aiMovieCache, setAiMovieCache] = useState('');

    // Reset pagination state when search query or mood changes
    useEffect(() => {
        setMovies([]);
        setPage(1);
        setHasMore(true);
        if (!debouncedMoodQuery) {
            setAiMovieCache(''); // clear cache if mood is cleared
        }
    }, [debouncedSearchQuery, debouncedMoodQuery]);

    // Fetch Logic
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                let data;

                // Level 3 AI Mood Integration
                if (debouncedMoodQuery && debouncedSearchQuery === '') {
                    let aiSuggestedMovie = aiMovieCache;

                    // Only ask Gemini on the first page load
                    if (page === 1 || !aiSuggestedMovie) {
                        aiSuggestedMovie = await getMovieByMoodUsingGemini(debouncedMoodQuery);
                        setAiMovieCache(aiSuggestedMovie);
                    }

                    // Search TMDB for what the AI suggested
                    data = await searchMovies(aiSuggestedMovie, page);
                } else if (debouncedSearchQuery) {
                    data = await searchMovies(debouncedSearchQuery, page);
                } else {
                    data = await getPopularMovies(page);
                }

                setMovies(prevMovies => {
                    const newMovies = data.results.filter(
                        (newMovie) => !prevMovies.some((prev) => prev.id === newMovie.id)
                    );
                    return [...prevMovies, ...newMovies];
                });

                setHasMore(data.page < data.total_pages);
            } catch (err) {
                setError('Failed to fetch movies. Please check your API key.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchQuery, debouncedMoodQuery, page]);

    // Infinite Scroll Hook Usage
    const loadMoreMovies = () => {
        if (!loading && hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const lastMovieElementRef = useInfiniteScroll(loadMoreMovies, loading, hasMore);

    return (
        <div className="w-full animate-fade-in">
            <div className="mb-8 flex items-center gap-3">
                <Film className="w-8 h-8 text-rose-500" />
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                    {debouncedSearchQuery ? `Search Results for "${debouncedSearchQuery}"` : 'Popular Movies'}
                </h1>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-rose-500 p-4 rounded-xl mb-6">
                    {error}
                </div>
            )}

            {movies.length === 0 && !loading && !error ? (
                <div className="text-zinc-500 text-center py-20 text-lg">
                    No movies found for "{debouncedSearchQuery}". Try another search term.
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {movies.map((movie, index) => {
                        // Attach the ref to the last movie card
                        if (movies.length === index + 1) {
                            return (
                                <div ref={lastMovieElementRef} key={`${movie.id}-${index}`}>
                                    <MovieCard movie={movie} />
                                </div>
                            );
                        } else {
                            return <MovieCard key={`${movie.id}-${index}`} movie={movie} />;
                        }
                    })}
                </div>
            )}

            {/* Loading Indicator for Infinite Scroll & Initial Load */}
            {loading && (
                <div className="flex justify-center my-12">
                    <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};

export default Home;
