import "./Table.css"
import { toast } from "react-toastify"
import axios from "axios"
import { Fragment, useState } from "react"
import Modal from "../Modal/Modal"

function OffersTable({ offers, openUpdateModal, openDeleteModal }) {
    const [extraData, setExtraData] = useState([]);
    const [formData, setFormaData] = useState({
        number: "",
        quantity: 0,
        unit: "buc",
        description: "",
        deadline: new Date().toISOString().split("T")[0]
    })
    const [orderModal, setOrderModal] = useState(false);
    const [offerId, setOfferId] = useState(null);

    const getOrder = async (id) => {
        try {
            const order = await axios.get(`${import.meta.env.VITE_API}/offer/getOfferOrder/${id}`, {
                withCredentials: true,
            });
            setExtraData({
                id,
                type: "cerere",
                data: order.data,
            });
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormaData((prev) => ({ ...prev, [name]: value }));
    }

    const createOrder = async (id) => {
        try {
            const respone = await axios.post(`${import.meta.env.VITE_API}/order/createOrder/${id}`, {
                number: formData.number,
                quantity: formData.quantity,
                unit: formData.unit,
                description: formData.description,
                deadline: formData.deadline,
            }, {
                withCredentials: true,
            });
            toast.success(respone.data.message);
            setExtraData({
                number: null,
                quantity: null,
                unit: "buc",
                description: "",
                deadline: new Date()
            })
            setOrderModal(false);
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
                            <th>Preț</th>
                            <th>Termen de finalizare</th>
                            <th>Status</th>
                            <th>Comandă</th>
                            <th>Creează o comandă</th>
                            <th>Opțiuni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            offers.map((offer) => (
                                <Fragment key={offer.id}>
                                    <tr>
                                        <td>{offer.id}</td>
                                        <td>{offer.price}</td>
                                        <td>{new Date(offer.deadline).toLocaleDateString()}</td>
                                        <td>{offer.isAccepted ? "Acceptată" : "Neaceptată"}</td>
                                        <td><button className="table-button" onClick={() => getOrder(offer.id)}>Generează</button></td>
                                        <td><button className="table-button" onClick={() => { setOrderModal(true); setOfferId(offer.id) }}>Adaugă o comandă</button></td>
                                        <td>
                                            <div className="button-container">
                                                <button className="table-button" onClick={() => openUpdateModal(offer)}>Actualizează ofertă</button>
                                                <button className="table-button" onClick={() => openDeleteModal(offer.id)}>Șterge ofertă</button>
                                            </div>
                                        </td>
                                    </tr>
                                    {
                                        extraData.id === offer.id && (
                                            <tr className="extra-data-row">
                                                <td colSpan="7">
                                                    <strong className="extra-data-title">COMANDĂ</strong>
                                                    <table className="nested-table">
                                                        <thead>
                                                            <tr>
                                                                <th>ID</th>
                                                                <th>Număr comandă</th>
                                                                <th>Cantitate</th>
                                                                <th>Descrierere</th>
                                                                <th>Termen de finalizare</th>
                                                                <th>Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr key={extraData.data.id}>
                                                                <td>{extraData.data.id}</td>
                                                                <td>{extraData.data.number}</td>
                                                                <td>{`${extraData.data.quantity} ${extraData.data.unit}`}</td>
                                                                <td>{extraData.data.description}</td>
                                                                <td>{new Date(extraData.data.deadline).toLocaleDateString()}</td>
                                                                <td>{extraData.data.isCompleted ? "Finalizată" : "Nefinalizată"}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </Fragment>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <Modal isOpen={orderModal} isClosed={() => setOrderModal(false)}>
                <h2>Adaugă o comandă</h2>
                <div className="form">
                    <form action={createOrder}>
                        <div className="field">
                            <label>Introduceți numarăul de comandă
                                <input
                                    type="text"
                                    name="number"
                                    value={formData.number}
                                    onChange={handleChange}
                                    placeholder="G123456"
                                />
                            </label>
                        </div>
                        <div className="field">
                            <label>Introduceți cantitatea
                                <input
                                    type="text"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    placeholder="100"
                                />
                            </label>
                        </div>
                        <div className="field">
                            <label>Selectați unitatea de măsură
                                <select
                                    name="unit"
                                    id="unit"
                                    onChange={handleChange}
                                    value={formData.unit}>
                                    <option value="buc">Bucată</option>
                                    <option value="kg">Kilogram</option>
                                </select>
                            </label>
                        </div>
                        <div className="field">
                            <label>Introduceți descrierea comenzii
                                <textarea
                                    name="description"
                                    id="description"
                                    onChange={handleChange}
                                    value={formData.description}
                                    rows="5"
                                    placeholder="Introduceți descrierea">
                                </textarea>
                            </label>
                        </div>
                        <div className="field">
                            <label>Introduceți termenul de finalizare
                                <input
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <button type="submit" onClick={(e) => { e.preventDefault(); createOrder(offerId) }}>Creează</button>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default OffersTable;