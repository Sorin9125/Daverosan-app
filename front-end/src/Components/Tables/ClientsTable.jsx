import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import "./Table.css";
import axios from "axios";
import Modal from "../Modal/Modal";

function ClientsTable({ clients, openDeleteModal, openUpdateModal }) {
    const [extraData, setExtraData] = useState({});
    const [requestModal, setRequestModal] = useState(false);
    const [formData, setFormData] = useState({
        description: "",
        date: "",
    });
    const [clientId, setClientId] = useState(null);

    const clientRequests = async (id) => {
        try {
            const requests = await axios.get(
                `${import.meta.env.VITE_API}/client/getClientRequests/${id}`,
                {
                    withCredentials: true,
                }
            );
            setExtraData({
                id,
                type: "cereri de ofertă",
                data: requests.data,
            });
        } catch (err) {
            console.error(err);
        }
    };

    const clientOffers = async (id) => {
        try {
            const offers = await axios.get(
                `${import.meta.env.VITE_API}/client/getClientOffers/${id}`,
                {
                    withCredentials: true,
                }
            );
            setExtraData({
                id,
                type: "oferte",
                data: offers.data,
            });
        } catch (err) {
            console.error(err);
        }
    };

    const clientOrders = async (id) => {
        try {
            const offers = await axios.get(
                `${import.meta.env.VITE_API}/client/getClientOrders/${id}`,
                {
                    withCredentials: true,
                }
            );
            setExtraData({
                id,
                type: "comenzi",
                data: offers.data,
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const createRequest = async (id) => {
        try {
            const respone = await axios.post(
                `${import.meta.env.VITE_API}/request/createRequest/${id}`,
                {
                    description: formData.description,
                    sentAt: formData.date,
                },
                {
                    withCredentials: true,
                }
            );
            toast.success(respone.data.message);
            setFormData({
                description: "",
                date: "",
            });
            setRequestModal(false);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <>
            <div className="table-container">
                <table className="client-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nume</th>
                            <th>Email</th>
                            <th>Cereri</th>
                            <th>Oferte</th>
                            <th>Comenzi</th>
                            <th>Creează o cerere</th>
                            <th>Opțiuni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => (
                            <Fragment key={client.id}>
                                <tr>
                                    <td>{client.id}</td>
                                    <td>{client.name}</td>
                                    <td>{client.email}</td>
                                    <td>
                                        <button
                                            className="table-button"
                                            onClick={() => clientRequests(client.id)}
                                        >
                                            Generează
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="table-button"
                                            onClick={() => clientOffers(client.id)}
                                        >
                                            Generează
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="table-button"
                                            onClick={() => clientOrders(client.id)}
                                        >
                                            Generează
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="table-button"
                                            onClick={() => {
                                                setClientId(client.id);
                                                setRequestModal(true);
                                            }}
                                        >
                                            Adaugă o cerere de ofertă
                                        </button>
                                    </td>
                                    <td>
                                        <div className="button-container">
                                            <button type="submit" className="table-button" onClick={() => openUpdateModal(client)}>Actualizare client</button>
                                            <button className="table-button" onClick={() => openDeleteModal(client.id)}>Ștergere client</button>
                                        </div>
                                    </td>
                                </tr>
                                {extraData.id === client.id && (
                                    <tr className="extra-data-row">
                                        <td colSpan="8">
                                            <strong>{extraData.type.toUpperCase()}</strong>

                                            {extraData.type === "cereri de ofertă" && (
                                                <table className="nested-table">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Descriere</th>
                                                            <th>Dată primită</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {extraData.data.map((requests) => (
                                                            <tr key={requests.id}>
                                                                <td>{requests.id}</td>
                                                                <td>{requests.description}</td>
                                                                <td>
                                                                    {new Date(
                                                                        requests.sentAt
                                                                    ).toLocaleDateString()}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )}

                                            {extraData.type === "oferte" && (
                                                <table className="nested-table">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Preț</th>
                                                            <th>Termen de finalizare</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {extraData.data.map((offers) => (
                                                            <tr key={offers.id}>
                                                                <td>{offers.id}</td>
                                                                <td>{offers.price}</td>
                                                                <td>
                                                                    {new Date(
                                                                        offers.deadline
                                                                    ).toLocaleDateString()}
                                                                </td>
                                                                <td>
                                                                    {offers.isAccepted
                                                                        ? "Acceptată"
                                                                        : "Neacceptată"}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )}

                                            {extraData.type === "comenzi" && (
                                                <table className="nested-table">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Număr comandă</th>
                                                            <th>Cantitate</th>
                                                            <th>Descriere</th>
                                                            <th>Termen de finalizare</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {extraData.data.map((order) => (
                                                            <tr key={order.id}>
                                                                <td>{order.id}</td>
                                                                <td>{order.number}</td>
                                                                <td>{`${order.quantity} ${order.unit}`}</td>
                                                                <td>{order.description}</td>
                                                                <td>
                                                                    {new Date(
                                                                        order.deadline
                                                                    ).toLocaleDateString()}
                                                                </td>
                                                                <td>
                                                                    {order.isCompleted
                                                                        ? "Finalizată"
                                                                        : "Nefinalizată"}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )}
                                        </td>
                                    </tr>
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={requestModal} isClosed={() => setRequestModal(false)}>
                <h2>Adaugă o cerere</h2>
                <div className="form">
                    <form action={createRequest}>

                        <div className="field">
                            <label>
                                Descrierea cererii
                                <textarea
                                    name="description"
                                    id="description"
                                    placeholder="Introduceți descrierea"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="5"
                                ></textarea>
                            </label>
                        </div>
                        <div className="field">
                            <label>
                                Data la care a fost trimisă cererea
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                createRequest(clientId);
                            }}
                        >
                            Creează
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    );
}

export default ClientsTable;
