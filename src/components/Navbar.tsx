import { Link, NavLink } from "react-router-dom"
import { useState } from "react"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded-lg transition-colors ${
            isActive ? "text-red-500 font-semibold" : "text-slate-300 hover:text-white"
        }`

    return (
        <nav className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
            
            <div className="flex items-center justify-between px-6 py-4 mx-auto">
                
                <Link to="/" className="text-xl font-bold tracking-wide">
                    <span className="text-red-500">🎬</span> Movies
                </Link>
                
                <div className="hidden md:flex gap-1">
                    <NavLink to="/" end className={linkClass}>Home</NavLink>
                    <NavLink to="/movies" className={linkClass}>Browse</NavLink>
                    <NavLink to="/watchlist" className={linkClass}>Watchlist</NavLink>
                </div>
                
                <button 
                    onClick={() => setIsOpen(prev => !prev)}
                    aria-label="Toggle menu"
                    className="md:hidden text-2xl">
                    ☰
                </button>
                
            </div>
            
            {isOpen && (
                <div className="md:hidden flex flex-col gap-1 px-6 pb-4">
                    <NavLink to="/" end onClick={() => setIsOpen(false)} className={`text-center ${linkClass}`}>
                        Home
                    </NavLink>
                    <NavLink to="/movies" onClick={() => setIsOpen(false)} className={`text-center ${linkClass}`}>
                        Browse
                    </NavLink>
                    <NavLink to="/watchlist" onClick={() => setIsOpen(false)} className={`text-center ${linkClass}`}>
                        Watchlist
                    </NavLink>
                </div>
            )}
        </nav>
    )
}