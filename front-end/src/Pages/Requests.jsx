import { useCallback, useEffect, useState } from "react";
import RequestsTable from "../Components/Tables/RequestTable/RequestsTable";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "../Components/Modal/Modal";

function Request() {
    const [requestData, setRequestData] = useState([]);
    const [requestId, setRequestId] = useState(null);
    const [updateModal, setUpdateModal] = useState(false);
    const [updateData, setUpdateData] = useState({
        description: "",
        sentAt: new Date()
    })
    const [deleteModal, setDeleteModal] = useState(false);

    const fetchRequests = useCallback(() => {
        const getRequests = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API}/request/getAllRequests`, {
                    withCredentials: true,
                });
                setRequestData(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        getRequests();
    }, [])

    useEffect(fetchRequests, [fetchRequests]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateData((prev) => ({ ...prev, [name]: value }));
    }

    const openUpdateModal = (request) => {
        setUpdateData({
            description: request.description,
            sentAt: request.sentAt,
        });
        setRequestId(request.id);
        setUpdateModal(true);
    }

    const updateRequest = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API}/request/updateRequest/${requestId}`, {
                sentAt: updateData.sentAt,
                description: updateData.description,
            }, {
                withCredentials: true,
            });
            toast.success(response.data.message);
            setRequestData(prev => prev.map((request) =>
                request.id == requestId ? {
                    ...request,
                    description: updateData.description,
                    sentAt: updateData.sentAt,
                } : request))
            setUpdateData({
                sentAt: new Date(),
                description: ""
            });
            setUpdateModal(false);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const openDeleteModal = (id) => {
        setRequestId(id);
        setDeleteModal(true);
    }

    const deleteRequest = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API}/request/deleteRequest/${requestId}`);
            toast.success(response.data.message);
            fetchRequests();
            setDeleteModal(false);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <>
            <h1>Cereri de ofertă</h1>
            <RequestsTable requests={requestData} updateModal={openUpdateModal} deleteModal={openDeleteModal} />
            {/* Modal pentru actualizat cereri de oferta */}
            <Modal isOpen={updateModal} isClosed={() => setUpdateModal(false)}>
                <h2>Actualizare cerere de ofertă</h2>
                <div className="form">
                    <form action={updateRequest}>
                        <div className="field">
                            <label>
                                Introduceți descrierea
                                <textarea
                                    name="description"
                                    id="description"
                                    value={updateData.description}
                                    onChange={handleChange}
                                    rows="5"
                                >
                                </textarea>
                            </label>
                        </div>
                        <div className="field">
                            <label >Introduceți data la care a fost trimisă cererea
                                <input
                                    type="date"
                                    name="sentAt"
                                    value={new Date(updateData.sentAt).toISOString().split("T")[0]}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <button type="submit" onClick={(e) => { e.preventDefault(); updateRequest(); }}>Salvează</button>
                    </form>
                </div>
            </Modal>
            {/* Modala pentru sters cereri de oferta */}
            <Modal isOpen={deleteModal} isClosed={() => setDeleteModal(false)}>
                <h2>Ștergere cererea de ofertă</h2>
                <p>Sunteți sigur ca vreți să ștergeți această cerere de ofertă?</p>
                <button onClick={(e) => { e.preventDefault(); deleteRequest(); }}>Da</button>
                <button className="cancel-button" onClick={() => { setDeleteModal(false); }}>Anulează</button>
            </Modal>
        </>
    )
}

export default Request;