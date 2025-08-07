import { useEffect } from "react";
import userStore from "../Store/userStore";
import { Outlet, useNavigate } from "react-router-dom";

function RoleBasedAcces({ WrapperComponent }) {
    const [user] = userStore((state) => [state.user]);
    const navigate = useNavigate(); 
    console.log(user);
    useEffect(() => {
        if (user === null) {
            navigate("/");
        } else {
            navigate("/clienti");
        }
    }, [user]);

    return (
        <WrapperComponent>
            <Outlet />
        </WrapperComponent>
    );
}

export default RoleBasedAcces;
