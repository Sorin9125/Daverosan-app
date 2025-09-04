import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

function ProtectedRoute({ children }) {
    const { user } = useContext(AuthContext);

    if(!user) {
        return <Navigate to="/" />
    } else {
        if(!user.isVerified) {
            return <Navigate to={`/activate-account/${user.email}`} />
        }
    }

    return children;
}

export default ProtectedRoute