import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Browse from "./pages/Browse"
import WatchList from "./pages/WatchList"
import MovieDetails from "./pages/MovieDetails"
import Navbar from "./components/Navbar"
import NotFound from "./pages/NotFound"

export default function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<Browse />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/watchlist" element={<WatchList />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    )
}