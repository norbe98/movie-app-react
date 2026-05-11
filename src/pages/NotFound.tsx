import { useNavigate } from "react-router-dom"

export default function NotFound() {
    
    const navigate = useNavigate()

    return (
        <div className="text-center">
            <h1 className="text-6xl font-bold">404</h1>
            <p>Page not found</p>
            <button onClick={() => navigate("/")}>Back to home</button>
        </div>
    )
}