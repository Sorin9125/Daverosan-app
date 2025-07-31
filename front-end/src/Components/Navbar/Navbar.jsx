import { Link } from "react-router-dom";
import "./Navbar.css"

function Navbar() {
    return (
        <>
            <nav className="navbar">
                <h2>Daverosan-manager de comenzi</h2>
                <li className="navbar-items">
                    <ul><Link to="/clienti">Clienți</Link></ul>
                    <ul><Link to="/cereri">Cereri de ofertă</Link></ul>
                    <u><Link to="/oferte">Oferte</Link></u>
                    <ul><Link to="/comenzi">Comenzi</Link></ul>
                </li>
            </nav>
        </>
    )
}

export default Navbar;