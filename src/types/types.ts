export type Movie = {
    id: number,
    title: string,
    vote_average: number,
    poster_path: string,
    release_date?: string,
    runtime?: number,
    overview?: string,
    tagline?: string,
    genres?: Genre[],
    backdrop_path?: string,
}

export type Genre = {
    id: number,
    name: string,
}

export type Trailer = {
    key: string,
    site: string,
    type: string,
}

export type MoviesListProps = {
    movies: Movie[],
    variant: "home" | "browse" | "details" | "watchlist",
    trailer?: Trailer[],
}

export type MovieCardProps = {
    movie: Movie,
    variant: "home" | "browse" | "details" | "watchlist",
}

export type WatchListContextType = {
    watchList: Movie[],
    addToWatchList: (movie: Movie) => void,
    removeFromWatchList: (id: number) => void,
}