import MovieList from "../components/MovieList"
import { useEffect, useState } from "react"
import type { Movie } from "../types/types"
import { getRandomPage } from "../utils/helper"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export default function Home() {

    const [popularMovies, setPopularMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            try {
                const randomPage = getRandomPage()
                const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${randomPage}`)
                const data = await res.json()
                setPopularMovies(data.results || [])
            } catch (error) {
                console.error("Failed to load movies:", error)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    return (
        <div className="flex flex-col gap-12 max-w-7xl mx-auto px-6 py-12 md:py-20">
            
            <div className="flex flex-col gap-4 max-w-3xl">
                <p className="text-red-500 text-sm font-semibold uppercase tracking-widest">
                    Trending Now
                </p>

                <h1 className="text-white font-bold text-4xl md:text-6xl leading-tight">
                    The most popular movies, all in one place
                </h1>

                <div className="h-1 w-24 bg-red-500 rounded-full mt-2" />

                <p className="text-slate-400 text-lg mt-2">
                    Discover what everyone's watching right now
                </p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-12 h-12 border-4 border-slate-700 border-t-red-500 rounded-full animate-spin" />
                </div>
            ) : (
                <MovieList movies={popularMovies} variant="home" />
            )}
        </div>
    )
}