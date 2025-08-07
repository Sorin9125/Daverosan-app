import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import userStore from "../../Store/userStore";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"

function LoginPage () {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    }

    const registerUser = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API}/user/createUser`, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
            }, {
                withCredentials: true,
            });
            toast.success(response.data.message);
            userStore(response.data.user);
            navigate("/clienti");
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <>
            <h2>Daverosan App</h2>
            <div className="auth-container">
                <h2>Autentificare</h2>
                <form action={registerUser}></form>
                    <label>Introduceți adresa de mail
                        <input 
                        type="text" 
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        placeholder="mail@institutie.ro"
                        />
                    </label>
                    <label>Introduceți parola
                        <input 
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        placeholder="Parola" 
                        />
                    </label>
            </div>
        </>
    )
}

export default LoginPage;