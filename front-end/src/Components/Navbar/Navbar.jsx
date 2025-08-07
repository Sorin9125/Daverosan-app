import { Link } from "react-router-dom";
import "./Navbar.css"
import userStore from "../../Store/userStore";

function Navbar() {
    const { user } = userStore();
    return (
        <>
            <nav className="navbar">
                <div className="navbar-items">
                    <Link to="/clienti">Clienți</Link>
                    <Link to="/cereri">Cereri de ofertă</Link>
                    <Link to="/oferte">Oferte</Link>
                    <Link to="/comenzi">Comenzi</Link>
                </div>
                <div className="navbar-items">
                    {
                        user ? (
                            <span>Bine ai venit <strong>{user.firstName} {user.lastName}</strong></span>
                        ) : <></>
                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar;