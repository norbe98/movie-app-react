import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import type { Movie, Trailer } from "../types/types"
import MovieList from "../components/MovieList"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export default function MovieDetails() {

    const { id } = useParams()

    const [movieDetails, setMovieDetails] = useState<Movie[]>([])
    const [trailer, setTrailer] = useState<Trailer[]>([])
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        async function loadMovieDetails() {
            try {
                setLoading(true)
                setNotFound(false)
                
                const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
                
                if (!movieRes.ok) {
                    setNotFound(true)
                    return
                }
                
                const movieData = await movieRes.json()
                setMovieDetails([movieData])
                
                const trailerRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
                const trailerData = await trailerRes.json()
                setTrailer(trailerData.results || [])
            } catch (error) {
                console.error("Failed to load movie details:", error)
                setNotFound(true)
            } finally {
                setLoading(false)
            }
        }
        loadMovieDetails()
    }, [id])

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="w-12 h-12 border-4 border-slate-700 border-t-red-500 rounded-full animate-spin" />
            </div>
        )
    }

    if (notFound) {
        return (
            <div className="flex flex-col items-center gap-6 max-w-md mx-auto px-6 py-20 text-center">
                <h2 className="text-3xl font-bold">Movie not found</h2>

                <p className="text-slate-400">
                    We couldn't find the movie you're looking for.
                </p>

                <Link 
                    to="/movies"
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                    Browse movies
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
            <MovieList movies={movieDetails} variant="details" trailer={trailer} />
        </div>
    )
}