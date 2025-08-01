import { useState } from "react";
import ClientsTable from "../Components/Tables/Clients/ClientsTable";
import Modal from "../Components/Modal/Modal";
import { toast } from "react-toastify";

function Client() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        name: ""
    });

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        try {
            const respone = await axios.post(`${import.meta.env.VITE_API}/client/createClient`, {
                name: formData.name,
                email: formData.email,
            }, {
                withCredentials: true,
            });
            toast.success(respone.data);
            setIsModalOpen(false);
            setFormData({
                name: "",
                email: ""
            });
        } catch (err) {
            toast.error("Eroare");
        }
    }
    return (
        <>
            <h1>Pagina cu clienți</h1>
            <button onClick={() => setIsModalOpen(true)}>Adaugă un client</button>
            <ClientsTable />
            <Modal isOpen={isModalOpen} isClosed={() => setIsModalOpen(false)}>
                <h2>Adaugă un client</h2>
                <div className="form">
                    <form action={handleSubmit}>
                        <div className="field">
                            <label>Introduceți numele clientului
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Introduceți numele"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="form">
                            <label>Introduceți email-ul clientului
                                <input 
                                    type="text"
                                    name="email"
                                    placeholder="client@firma.ro"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <button type="submit" onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}>Creează client</button>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default Client;