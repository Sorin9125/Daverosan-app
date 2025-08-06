import { toast } from "react-toastify";
import Modal from "../Modal/Modal";
import axios from "axios";
import { Fragment, useState } from "react";

function OrdersTable({ orders, openUpdateModal, openDeleteModal }) {
    const [extraData, setExtraData] = useState([]);
    const [formData, setFormData] = useState({
        reper: "",
        scheme: "",
        weight: 0,
        quantity: 0,
    })
    const [orderId, setOrderId] = useState(null);
    const [productionNoteId, setProductionNoteId] = useState(null);
    const [createProductionNoteModal, setCreateProductionNoteModal] = useState(false);
    const [uploadFileModal, setUploadFileModal] = useState(false);
    const [file, setFile] = useState(null);
    const [updateProductionNoteModal, setUpdateProductionNoteModal] = useState(false);
    const [updateData, setUpdateData] = useState({
        reper: "",
        scheme: "",
        weight: 0,
        quantity: 0,
    });
    const [deleteProductionNoteModal, setDeleteProductionNoteModal] = useState(false);
    const getProductionNote = async (id) => {
        try {
            const productionNote = await axios.get(`${import.meta.env.VITE_API}/order/getOrderProductionNotes/${id}`, {
                withCredentials: true,
            });
            setExtraData({
                id,
                type: "note de producție",
                data: productionNote.data
            })
            setOrderId(null);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const createProductionNote = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API}/productionNote/createProductionNote/${orderId}`, {
                reper: formData.reper,
                scheme: formData.scheme,
                weight: formData.weight,
                quantity: formData.quantity,
            }, {
                withCredentials: true,
            });
            toast.success(response.data.message);
            setFormData({
                reper: "",
                scheme: "",
                weight: 0,
                quantity: 0,
            })
            setCreateProductionNoteModal(false);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }

    const uploadFromFile = async () => {
        const fileData = new FormData();
        fileData.append("file", file);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API}/productionNote/uploadExcel/${orderId}`,
                fileData
                , {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
            toast.success(response.data.message);
            setFile(null);
            setUploadFileModal(false);
        } catch (err) {
            toast.error(err.response.data.message)
        }
    }

    const handleUpdate = (e) => {
        const { name, value } = e.target;
        setUpdateData((prev) => ({ ...prev, [name]: value }));
    }

    const updateProductionNote = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API}/productionNote/updateProductionNote/${productionNoteId}`, {
                reper: updateData.reper,
                scheme: updateData.scheme,
                weight: updateData.weight,
                quantity: updateData.quantity,
            }, {
                withCredentials: true
            });
            toast.success(response.data.message);
            setUpdateProductionNoteModal(false)
        } catch (err) {
            toast.error(err.response.data.message)
        }
    }

    const deleteProductionNote = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API}/productionNote/deleteProductionNote/${productionNoteId}`);
            toast.success(response.data.message);
            setDeleteProductionNoteModal(false)
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const finishProductionNote = async (id) => {
        try {
            const response = await axios.patch(`${import.meta.env.VITE_API}/productionNote/finishProductionNote/${id}`, {}, {
                withCredentials: true,
            });
            toast.success(response.data.message);
        } catch (err) {
            console.log(err);
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
                            <th>Număr</th>
                            <th>Cantitate</th>
                            <th>Descriere</th>
                            <th>Termen de finalizare</th>
                            <th>Status</th>
                            <th>Notă de producție</th>
                            <th>Adaugă o notă de producție</th>
                            <th>Opțiuni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order) => (
                                <Fragment key={order.id}>
                                    <tr>
                                        <td>{order.id}</td>
                                        <td>{order.number}</td>
                                        <td>{`${order.quantity} ${order.unit}`}</td>
                                        <td>{order.description}</td>
                                        <td>{new Date(order.deadline).toLocaleDateString()}</td>
                                        <td>{order.isCompleted ? "Finalizată" : (order.quantity - order.remainingQuantity) / order.quantity * 100 + "%"}</td>
                                        <td>
                                            <button className="table-button" onClick={() => getProductionNote(order.id)}>Generează</button>
                                        </td>
                                        <td>
                                            <div className="button-container">
                                                <button className="table-button" onClick={() => { setCreateProductionNoteModal(true), setOrderId(order.id) }}>Creează</button>
                                                <button className="table-button" onClick={() => { setUploadFileModal(true), setOrderId(order.id) }}>Importă fișier</button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="button-container">
                                                <button className="table-button" onClick={() => openUpdateModal(order)}>Actualizează comandă</button>
                                                <button className="table-button" onClick={() => openDeleteModal(order.id)}>Șterge comanda</button>
                                            </div>
                                        </td>
                                    </tr>
                                    {
                                        order.id == extraData.id && (
                                            <tr className="extra-data-row">
                                                <td colSpan="9">
                                                    <strong className="extra-data-title">Notă de producție</strong>
                                                    <table className="nested-table">
                                                        <thead>
                                                            <tr>
                                                                <th>ID</th>
                                                                <th>Piesă</th>
                                                                <th>Desen</th>
                                                                <th>Cantitate</th>
                                                                <th>Status</th>
                                                                <th style={{ textAlign: "center" }}>Opțiuni</th>
                                                            </tr>

                                                        </thead>
                                                        <tbody>
                                                            {
                                                                extraData.data.map((productionNote) => (
                                                                    <tr key={productionNote.id}>
                                                                        <td>{productionNote.id}</td>
                                                                        <td>{productionNote.reper}</td>
                                                                        <td>{productionNote.scheme}</td>
                                                                        <td>{productionNote.quantity}</td>
                                                                        <td>{productionNote.isFinished ? "Finalizată" : "Nefinalizată"}</td>
                                                                        <td>
                                                                            <div className="button-container">
                                                                                <button className="table-button" onClick={() => { finishProductionNote(productionNote.id);  }}>Finalizează</button>
                                                                                <button className="table-button" onClick={() => { setUpdateProductionNoteModal(true); setProductionNoteId(productionNote.id); setUpdateData(productionNote) }}>Actualizează nota de producție</button>
                                                                                <button className="table-button" onClick={() => { setDeleteProductionNoteModal(true); setProductionNoteId(productionNote.id) }}>Șterge nota de producție</button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }
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
            {/* Modala de adaugat o nota de productie */}
            <Modal isOpen={createProductionNoteModal} isClosed={() => setCreateProductionNoteModal(false)}>
                <h2>Creează o notă de producție</h2>
                <div className="form">
                    <form action={createProductionNote}>
                        <div className="field">
                            <label>Introduceți denumirea piesei
                                <input
                                    type="text"
                                    name="reper"
                                    value={formData.reper}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="field">
                            <label>Introduceți desenul
                                <input
                                    type="text"
                                    name="scheme"
                                    value={formData.scheme}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="field">
                            <label>Introduceți cantitatea
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="field">
                            <label>Introduceți greutatea (dacă este cazul)
                                <input
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <button type="submit" onClick={(e) => { createProductionNote(orderId); e.preventDefault() }}>Creează</button>
                    </form>
                </div>
            </Modal>
            {/* Modala de adaugat un fisier */}
            <Modal isOpen={uploadFileModal} isClosed={() => setUploadFileModal(false)}>
                <h2>Importă fișier cu nota de producție</h2>
                <div className="form">
                    <form action={uploadFromFile} encType="multipart/form-data">
                        <label>Fișierul trebuie să fie un tabel ce conține coloanele denumirea piesei, port-ul, desenul, cantitatea și greutatea. Numele coloanelor trebuie să facă parte din tabel și să înceapă din celula A1
                            <input
                                type="file"
                                onChange={handleFile}
                            />
                        </label>
                        <button type="submit" onClick={(e) => { e.preventDefault(); uploadFromFile() }}>Adaugă</button>
                    </form>
                </div>
            </Modal>
            {/* Modala pentru actualizat nota de productie */}
            <Modal isOpen={updateProductionNoteModal} isClosed={() => setUpdateProductionNoteModal(false)}>
                <h2>Actualizare notă de producție</h2>
                <div className="form">
                    <form action={createProductionNote}>
                        <div className="field">
                            <label>Introduceți denumirea piesei
                                <input
                                    type="text"
                                    name="reper"
                                    value={updateData.reper}
                                    onChange={handleUpdate}
                                />
                            </label>
                        </div>
                        <div className="field">
                            <label>Introduceți desenul
                                <input
                                    type="text"
                                    name="scheme"
                                    value={updateData.scheme}
                                    onChange={handleUpdate}
                                />
                            </label>
                        </div>
                        <div className="field">
                            <label>Introduceți cantitatea
                                <input
                                    type="number"
                                    name="quantity"
                                    value={updateData.quantity}
                                    onChange={handleUpdate}
                                />
                            </label>
                        </div>
                        <div className="field">
                            <label>Introduceți greutatea (dacă este cazul)
                                <input
                                    type="number"
                                    name="weight"
                                    value={updateData.weight}
                                    onChange={handleUpdate}
                                />
                            </label>
                        </div>
                        <button type="submit" onClick={(e) => { updateProductionNote(); e.preventDefault() }}>Salvează</button>
                    </form>
                </div>
            </Modal>
            {/* Modala pentru sters nota de productie */}
            <Modal isOpen={deleteProductionNoteModal} isClosed={() => setDeleteProductionNoteModal(false)}>
                <h2>Șterge nota de producție</h2>
                <p>Sunteți sigur că vreți să ștergeți această notă de producție</p>
                <button onClick={() => deleteProductionNote()}>Da</button>
                <button className="cancel-button">Nu</button>
            </Modal>
        </>
    )
}

export default OrdersTable;