import { createContext, useContext, useEffect, useState } from "react"
import type { Movie, WatchListContextType } from "../types/types"

const WatchListContext = createContext<WatchListContextType | null>(null)

export default function WatchListProvider({ children }: { children: React.ReactNode }) {

    const [watchList, setWatchList] = useState<Movie[]>(() => {
        const stored = localStorage.getItem('watchlist')
        return stored ? JSON.parse(stored) : []
    })

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(watchList))
    }, [watchList])

    function addToWatchList(movie: Movie) {
        setWatchList(prev => {
            if (prev.some(m => m.id === movie.id)) {
                return prev
            }
            return [...prev, movie]
        })
    }

    function removeFromWatchList(id: number) {
        setWatchList(prev => prev.filter(m => m.id !== id))
    }
    
    return (
        <WatchListContext.Provider value={{ watchList, addToWatchList, removeFromWatchList }}>
            {children}
        </WatchListContext.Provider>
    )
}

export function useWatchList() {
    const ctx = useContext(WatchListContext)
    if (!ctx) throw new Error('useWatchList must be used within WatchListProvider')
    return ctx
}