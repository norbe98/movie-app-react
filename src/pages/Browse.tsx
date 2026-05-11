import { useEffect, useState } from "react"
import type { Movie, Genre } from "../types/types"
import MovieList from "../components/MovieList"
import { getRandomPage } from "../utils/helper"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export default function Browse() {

    const [genres, setGenres] = useState<Genre[]>([])
    const [genreMovies, setGenreMovies] = useState<Movie[]>([])
    const [genreType, setGenreType] = useState<string>("")
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const [loadingGenres, setLoadingGenres] = useState(true)
    const [loadingMovies, setLoadingMovies] = useState(false)

    useEffect(() => {
        async function loadGenres() {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
                const data = await res.json()
                setGenres(data.genres || [])
            } catch (error) {
                console.error("Failed to load genres:", error)
            } finally {
                setLoadingGenres(false)
            }
        }
        loadGenres()
    }, [])

    async function loadMovies(id: number, name: string) {
        setLoadingMovies(true)
        setSelectedId(id)
        setGenreType(name)
        try {
            const randomPage = getRandomPage()
            const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${randomPage}&with_genres=${id}`)
            const data = await res.json()
            setGenreMovies(data.results || [])
        } catch (error) {
            console.error("Failed to load movies:", error)
        } finally {
            setLoadingMovies(false)
        }
    }

    return (
        <div className="flex flex-col gap-12 max-w-7xl mx-auto px-6 py-12 md:py-20">
            
            <div className="flex flex-col gap-4 max-w-3xl">
                <p className="text-red-500 text-sm font-semibold uppercase tracking-widest">
                    Browse
                </p>

                <h1 className="text-white font-bold text-4xl md:text-6xl leading-tight">
                    Pick your genre
                </h1>

                <div className="h-1 w-24 bg-red-500 rounded-full mt-2" />
                
                <p className="text-slate-400 text-lg mt-2">
                    Explore movies from your favorite categories
                </p>
            </div>

            {loadingGenres ? (
                <div className="flex justify-center py-12">
                    <div className="w-10 h-10 border-4 border-slate-700 border-t-red-500 rounded-full animate-spin" />
                </div>
            ) : (
                <div className="flex flex-wrap gap-3">
                    {genres.map(g => 
                        <button 
                            key={g.id}
                            onClick={() => loadMovies(g.id, g.name)}
                            className={`px-5 py-2 rounded-full font-medium transition-colors ${
                                selectedId === g.id ? "bg-red-500 text-white"
                                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                            }`}>
                            {g.name}
                        </button>
                    )}
                </div>
            )}

            {loadingMovies && (
                <div className="flex justify-center py-12">
                    <div className="w-10 h-10 border-4 border-slate-700 border-t-red-500 rounded-full animate-spin" />
                </div>
            )}

            {!loadingMovies && genreType && (
                <div className="flex flex-col gap-6">
                    <h2 className="text-white font-bold text-2xl md:text-3xl">
                        {genreType} <span className="text-slate-400">Movies</span>
                    </h2>
                    <MovieList movies={genreMovies} variant="browse" />
                </div>
            )}
        </div>
    )
}