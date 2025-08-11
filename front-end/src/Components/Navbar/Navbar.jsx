import { Link } from "react-router-dom";
import "./Navbar.css"
import { userContext } from "../../Context";
import { useContext } from "react";

function Navbar() {
    const { user } = useContext(userContext);
    console.log(user);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-items">
                    <Link to="/clienti">Clienți</Link>
                    <Link to="/cereri">Cereri de ofertă</Link>
                    <Link to="/oferte">Oferte</Link>
                    <Link to="/comenzi">Comenzi</Link>
                </div>
                <div>
                    {user && <span>Welcome, {user.firstName}</span>}
                </div>
            </nav>
        </>
    )
}

export default Navbar;