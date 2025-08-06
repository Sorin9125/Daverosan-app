import "./Table.css"
import { Fragment, useState } from "react";
import axios from "axios";
import Modal from "../Modal/Modal";
import { toast } from "react-toastify";

function RequestsTable({ requests, deleteModal, updateModal }) {
    const [extraData, setExtraData] = useState([]);
    const [offerModal, setOfferModal] = useState(false);
    const [requestId, setRequestId] = useState(null);
    const [formData, setFromData] = useState({
        price: 0,
        deadline: new Date()
    });

    const requestOffer = async (id) => {
        try {
            const offer = await axios.get(`${import.meta.env.VITE_API}/request/getRequestOffer/${id}`, {
                withCredentials: true,
            });
            setExtraData({
                id,
                type: "ofertă",
                data: offer.data,
            });
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFromData((prev) => ({ ...prev, [name]: value }))
    }

    const createOffer = async (id) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API}/offer/createOffer/${id}`, {
                deadline: formData.deadline,
                price: formData.price,
            }, {
                withCredentials: true,
            });
            toast.success(response.data.message);
            setFromData({
                price: 0,
                deadline: new Date()
            })
            setOfferModal(false);

        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Descriere</th>
                            <th>Dată primtă</th>
                            <th>Client</th>
                            <th>Ofertă</th>
                            <th>Creează o ofertă</th>
                            <th>Opțiuni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <Fragment key={request.id}>
                                <tr>
                                    <td>{request.id}</td>
                                    <td>{request.description}</td>
                                    <td>{new Date(request.sentAt).toLocaleDateString()}</td>
                                    <td>{request.client.name}</td>
                                    <td><button className="table-button" onClick={() => requestOffer(request.id)}>Generează</button></td>
                                    <td><button className="table-button" onClick={() => { setOfferModal(true); setRequestId(request.id) }}>Adaugă o ofertă</button></td>
                                    <td>
                                        <div className="button-container">
                                            <button className="table-button" onClick={() => updateModal(request)}>Actualizare cerere</button>
                                            <button className="table-button" onClick={() => deleteModal(request.id)}>Șterge cerere</button>
                                        </div>
                                    </td>
                                </tr>
                                {extraData.id === request.id && (
                                    <tr className="extra-data-row">
                                        <td colSpan="7">
                                            <strong className="extra-data-title">OFERTĂ</strong>
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
                                                    <tr key={extraData.data.id}>
                                                        <td>{extraData.data.id}</td>
                                                        <td>{extraData.data.price}</td>
                                                        <td>{new Date(extraData.data.deadline).toLocaleDateString()}</td>
                                                        <td>{extraData.data.isAccepted ? "Acceptată" : "Neacceptată"}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={offerModal} isClosed={() => setOfferModal(false)}>
                <h2>Adaugă o ofertă</h2>
                <div className="form">
                    <form action={createOffer}>
                        <div className="field">
                            <label>Introduceți valoarea ofertei (în euro)
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="100"
                                />
                            </label>
                        </div>
                        <div className="field">
                            <label>Introduceți data limită pentru finalizare
                                <input
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <button type="submit" onClick={(e) => { e.preventDefault(); createOffer(requestId) }}>Creează</button>
                    </form>
                </div>
            </Modal>
        </>
    )
};

export default RequestsTable;