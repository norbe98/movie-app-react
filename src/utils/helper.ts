export function getPosterUrl(posterPath: string | null | undefined): string | null {
    if (!posterPath) return null
    return `https://image.tmdb.org/t/p/w500/${posterPath}`
}

export function getRandomPage(maxPages: number = 20): number {
    return Math.floor(Math.random() * maxPages) + 1
}