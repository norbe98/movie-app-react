import { Link } from "react-router-dom"
import MovieList from "../components/MovieList"
import { useWatchList } from "../context/WatchListContext"

export default function WatchList() {

    const { watchList } = useWatchList()

    return (
        <div className="flex flex-col gap-12 max-w-7xl mx-auto px-6 py-12 md:py-20">
            
            <div className="flex flex-col gap-4 max-w-3xl">
                <p className="text-red-500 text-sm font-semibold uppercase tracking-widest">
                    Your collection
                </p>

                <h1 className="text-white font-bold text-4xl md:text-6xl leading-tight">
                    Watchlist
                </h1>

                <div className="h-1 w-24 bg-red-500 rounded-full mt-2" />

                <p className="text-slate-400 text-lg mt-2">
                    {watchList.length === 0 
                        ? "Movies you save will appear here"
                        : `${watchList.length} ${watchList.length === 1 ? "movie" : "movies"} saved`
                    }
                </p>
            </div>

            {watchList.length === 0 ? (
                <div className="flex flex-col items-center gap-6 py-20 text-center">
                    <p className="text-7xl">🎬</p>

                    <div className="flex flex-col gap-2">
                        <p className="text-white text-xl font-medium">
                            Your watchlist is empty
                        </p>
                        
                        <p className="text-slate-400">
                            Start exploring and save the movies you want to watch
                        </p>
                    </div>

                    <Link 
                        to="/movies"
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors mt-2">
                        Browse movies
                    </Link>
                </div>
            ) : (
                <MovieList movies={watchList} variant="watchlist" />
            )}
        </div>
    )
}