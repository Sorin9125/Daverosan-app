import { useState, useEffect, useCallback } from "react";
import ClientsTable from "../Components/Tables/Clients/ClientsTable";
import Modal from "../Components/Modal/Modal";
import { toast } from "react-toastify";
import axios from "axios";

function Client() {
    const [clientData, setClientData] = useState([]);
    const [clientModal, setClientModal] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        name: "",
    });
    const [deleteModal, setDeleteModal] = useState(false);
    const [clientId, setClientId] = useState(null);
    const [updateModal, setUpdateModal] = useState(false);
    const [updateData, setUpdateData] = useState({
        name: "",
        email: ""
    })

    const fetchClients = useCallback(() => {
        const getClients = async () => {
            try {
                const clients = await axios.get(
                    `${import.meta.env.VITE_API}/client/getAllClients`,
                    {
                        withCredentials: true,
                    }
                );
                setClientData(clients.data);
            } catch (err) {
                console.error(err);
            }
        }
        getClients();
    }, []);

    useEffect(fetchClients, [fetchClients]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const createClient = async () => {
        try {
            const respone = await axios.post(
                `${import.meta.env.VITE_API}/client/createClient`,
                {
                    name: formData.name,
                    email: formData.email,
                },
                {
                    withCredentials: true,
                }
            );
                toast.success(respone.data.message);
                setClientModal(false);
                setFormData({
                    name: "",
                    email: "",
                });
                fetchClients();
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    const openDeleteModal = (id) => {
        setClientId(id);
        setDeleteModal(true);
    }

    const deleteClient = async () => {
        try {
            const respone = await axios.delete(`${import.meta.env.VITE_API}/client/deleteClient/${clientId}`, {
                withCredentials: true,
            });
                toast.success(respone.data.message);
                setDeleteModal(false);
                setClientId(null);
                fetchClients();
        } catch (err) {
            console.error(err.response.data.message);
        }
    }

    const openUpdateModal = (id) => {
        setClientId(id);
        setUpdateModal(true);
    }

    const onUpdateClick = (client) => {
        setUpdateData({
            name: client.name,
            email: client.email,
        })
        setClientId(client.id);
        setUpdateModal(true);
    }

    const updateClient = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API}/client/updateClient/${clientId}`, {
                name: updateData.name,
                email: updateData.email,
            }, {
                withCredentials: true,
            });
                toast.success(response.data.message);
                setUpdateModal(false);
                setClientId(null);
                setFormData({
                    name: "",
                    email: ""
                })
                fetchClients();
        } catch (err) {
            console.error(err.respone.data.message);
        }
    }
    return (
        <>
            <h1>Clienți</h1>
            <button onClick={() => setClientModal(true)}>Adaugă un client</button>
            <ClientsTable clients={clientData} openDeleteModal={openDeleteModal} openUpdateModal={openUpdateModal} onUpdateClick={onUpdateClick} />
            {/* Modala pentru creatClient */}
            <Modal isOpen={clientModal} isClosed={() => setClientModal(false)}>
                <h2>Adaugă un client</h2>
                <div className="form">
                    <form action={createClient}>
                        <div className="field">
                            <label>
                                Introduceți numele clientului
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
                            <label>
                                Introduceți email-ul clientului
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="client@firma.ro"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                createClient();
                            }}
                        >
                            Creează client
                        </button>
                    </form>
                </div>
            </Modal>
            {/* Modala pentru deleteUser  */}
            <Modal isOpen={deleteModal} isClosed={() => setDeleteModal(false)}>
                <h2>Confirmare ștergere client</h2>
                <p>Sunteți sigur că vreți sa ștergeți acest client?</p>
                <button onClick={deleteClient}>Da</button>
                <button className="cancel-button" onClick={() => setDeleteModal(false)}>Anulează</button>
            </Modal>
            {/* Modala pentru updateClient  */}
            <Modal isOpen={updateModal} isClosed={() => setUpdateModal(false)}>
                <h2>Actualizare client</h2>
                <div className="form">
                    <form action={updateClient}>
                        <div className="field">
                            <label>
                                Introduceți numele clientului
                                <input
                                    type="text"
                                    name="name"
                                    value={updateData.name}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Introduceți mail-ul clientului
                                <input
                                    type="text"
                                    name="email"
                                    value={updateData.email}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <button type="submit" onClick={(e) => { e.preventDefault(); updateClient() }}>Salvează</button>
                    </form>
                </div>
            </Modal>
        </>
    );
}

export default Client;
