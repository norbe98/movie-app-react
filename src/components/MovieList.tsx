import { useState, useEffect } from "react"
import type { MoviesListProps } from "../types/types"
import MovieCard from "./MovieCard"
import { AnimatePresence, motion } from "framer-motion"


export default function MovieList({ movies, variant, trailer }: MoviesListProps) {

    const [pageCounter, setPageCounter] = useState<number>(1)
    const [direction, setDirection] = useState<number>(1)

    useEffect(() => {
        setPageCounter(1)
    }, [movies])

    function paginate(perPage: number) {
        const start = (pageCounter - 1) * perPage
        return movies.slice(start, start + perPage)
    }

    function nextPage() {
        setDirection(1)
        setPageCounter(prev => prev + 1)
    }

    function prevPage() {
        setDirection(-1)
        setPageCounter(prev => prev - 1)
    }

    if (variant === "home") {
        const moviesPerPage = 3
        const maxPage = Math.ceil(movies.length / moviesPerPage)
        const visibleMovies = paginate(moviesPerPage)

        return (
            <div className="flex items-center gap-4 md:gap-6">
                <button 
                    onClick={prevPage}
                    disabled={pageCounter === 1}
                    aria-label="Previous"
                    className="text-slate-400 hover:text-white text-3xl disabled:opacity-20 disabled:cursor-not-allowed transition-colors shrink-0">
                    ‹
                </button>
                
                <div className="flex-1 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={pageCounter}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                            initial={{ opacity: 0, x: direction * 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction * -100 }}
                            transition={{ duration: 0.3 }}>
                            {visibleMovies.map(movie => 
                                <MovieCard key={movie.id} movie={movie} variant="home" />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
                
                <button 
                    onClick={nextPage}
                    disabled={pageCounter >= maxPage}
                    aria-label="Next"
                    className="text-slate-400 hover:text-white text-3xl disabled:opacity-20 disabled:cursor-not-allowed transition-colors shrink-0">
                    ›
                </button>
            </div>
        )
    }

    if (variant === "browse") {
        const moviesPerPage = 8
        const maxPage = Math.ceil(movies.length / moviesPerPage)
        const visibleMovies = paginate(moviesPerPage)

        return (
            <div className="flex flex-col gap-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {visibleMovies.map(movie => 
                        <MovieCard key={movie.id} movie={movie} variant="browse" />
                    )}
                </div>

                {movies.length > 0 && (
                    <div className="flex justify-center items-center gap-6">
                        <button 
                            onClick={prevPage}
                            disabled={pageCounter === 1}
                            className="px-5 py-2 rounded-lg bg-slate-800 text-slate-300 font-medium hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                            Previous
                        </button>
                        <p className="text-slate-400 font-medium">
                            Page {pageCounter} of {maxPage}
                        </p>
                        <button 
                            onClick={nextPage}
                            disabled={pageCounter >= maxPage}
                            className="px-5 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                            Next
                        </button>
                    </div>
                )}
            </div>
        )
    }

    if (variant === "details") {
        const youtubeTrailer = trailer?.find(tr => tr.site === "YouTube" && tr.type === "Trailer")

        return (
            <div className="flex flex-col gap-12">
                {movies.map(movie => 
                    <MovieCard key={movie.id} movie={movie} variant="details" />
                )} 
                
                {youtubeTrailer && (
                    <div className="flex flex-col gap-4">
                        <h2 className="text-white font-bold text-2xl md:text-3xl">Trailer</h2>
                        <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900">
                            <iframe 
                                allowFullScreen 
                                src={`https://www.youtube.com/embed/${youtubeTrailer.key}`}
                                className="w-full h-full"
                                title={`${movies[0]?.title} trailer`} />
                        </div>
                    </div>
                )}
            </div>
        )
    }

    if (variant === "watchlist") {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map(movie => 
                    <MovieCard key={movie.id} movie={movie} variant="watchlist" />
                )}
            </div>
        )
    }

    return null
}