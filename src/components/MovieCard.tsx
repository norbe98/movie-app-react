import { useNavigate } from "react-router-dom"
import type { MovieCardProps } from "../types/types"
import { useWatchList } from "../context/WatchListContext"
import { getPosterUrl } from "../utils/helper"


export default function MovieCard({ movie, variant }: MovieCardProps) {

    const navigate = useNavigate()
    const { watchList, addToWatchList, removeFromWatchList } = useWatchList()

    const posterUrl = getPosterUrl(movie.poster_path)

    function PosterImage() {
        if (!posterUrl) {
            return (
                <div className="aspect-[2/3] flex items-center justify-center bg-slate-800 text-slate-500 text-sm">
                    No poster
                </div>
            )
        }
        return (
            <img src={posterUrl} alt={`${movie.title} poster`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        )
    }

    if (variant === "home") {
        return (
            <div 
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="group cursor-pointer flex flex-col gap-3">
                <div className="overflow-hidden rounded-xl">
                    <PosterImage />
                </div>
                <div className="flex justify-between items-center gap-2">
                    <p className="text-white font-medium truncate">{movie.title}</p>
                    <p className="text-yellow-400 text-sm shrink-0">
                        ⭐ {movie.vote_average?.toFixed(1)}
                    </p>
                </div>
            </div>
        )
    }

    if (variant === "browse") {
        return (
            <div 
                className="group cursor-pointer flex flex-col gap-3"
                onClick={() => navigate(`/movie/${movie.id}`)}>
                <div className="overflow-hidden rounded-xl">
                    <PosterImage />
                </div>
                <div className="flex justify-between items-center gap-2">
                    <p className="text-white font-medium truncate">{movie.title}</p>
                    <p className="text-yellow-400 text-sm shrink-0">
                        ⭐ {movie.vote_average?.toFixed(1)}
                    </p>
                </div>
            </div>
        )
    }

    if (variant === "details") {
        const isInWatchlist = watchList.some(m => m.id === movie.id)
        
        return (
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-80 shrink-0 rounded-xl overflow-hidden">
                    <PosterImage />
                </div>
                <div className="flex flex-col gap-4 flex-1">
                    <h1 className="text-white font-bold text-3xl md:text-4xl">{movie.title}</h1>
                    
                    {movie.tagline && 
                        <p className="text-slate-400 italic text-lg">"{movie.tagline}"</p>
                    }
                    
                    <div className="flex flex-wrap gap-4 text-slate-300">
                        {movie.vote_average !== undefined && 
                            <p className="text-yellow-400 font-medium">
                                ⭐ {movie.vote_average.toFixed(1)} / 10
                            </p>
                        }
                        {movie.release_date && 
                            <p>📅 {movie.release_date.slice(0, 4)}</p>
                        }
                        {movie.runtime !== undefined && movie.runtime > 0 &&
                            <p>⏱️ {movie.runtime} min</p>
                        }
                    </div>

                    {movie.genres && movie.genres.length > 0 &&
                        <div className="flex flex-wrap gap-2">
                            {movie.genres.map(g => 
                                <span 
                                    key={g.id}
                                    className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm">
                                    {g.name}
                                </span>
                            )}
                        </div>
                    }
                    
                    {movie.overview && 
                        <div className="flex flex-col gap-2">
                            <h2 className="text-white font-bold text-xl">Overview</h2>
                            <p className="text-slate-300 leading-relaxed">{movie.overview}</p>
                        </div>
                    }

                    {isInWatchlist ? 
                        <button 
                            onClick={() => removeFromWatchList(movie.id)}
                            className="self-start px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors">
                            ✓ In watchlist
                        </button>
                        : 
                        <button 
                            onClick={() => addToWatchList(movie)}
                            className="self-start px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors">
                            + Add to watchlist
                        </button>
                    }
                </div>
            </div>
        )
    }

    if (variant === "watchlist") {
        return (
            <div className="group flex flex-col gap-3">
                <div 
                    className="overflow-hidden rounded-xl cursor-pointer"
                    onClick={() => navigate(`/movie/${movie.id}`)}>
                    <PosterImage />
                </div>
                <div className="flex justify-between items-center gap-2">
                    <p className="text-white font-medium truncate">{movie.title}</p>
                    <p className="text-yellow-400 text-sm shrink-0">
                        ⭐ {movie.vote_average?.toFixed(1)}
                    </p>
                </div>
                <button 
                    onClick={() => removeFromWatchList(movie.id)}
                    className="bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium py-2 rounded-lg transition-colors">
                    Remove from watchlist
                </button>
            </div>
        )
    }

    return null
}