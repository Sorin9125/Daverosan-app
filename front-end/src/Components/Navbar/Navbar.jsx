import { Link } from "react-router-dom";
import "./Navbar.css"

function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="navbar-items">
                    <Link to="/">Homepage</Link>
                    <Link to="/clienti">Clienți</Link>
                    <Link to="/cereri">Cereri de ofertă</Link>
                    <Link to="/oferte">Oferte</Link>
                    <Link to="/comenzi">Comenzi</Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar;1