import { toast } from "react-toastify";
import axios from "axios";
import Modal from "../Components/Modal/Modal";
import OrdersTable from "../Components/Tables/OrdersTable";
import { useCallback, useEffect, useState } from "react";

function Orders() {
    const [ordersData, setOrdersData] = useState([]);
    const [orderId, setOrderId] = useState(null);
    const [updateModal, setUpdateModal] = useState(false);
    const [updateData, setUpdateData] = useState({
        number: "",
        quantity: 0,
        unit: "",
        description: "",
        deadline: new Date().toISOString().split("T")[0]
    })
    const [deleteModal, setDeleteModal] = useState(false);

    const fetchOrders = useCallback(() => {
        const getOrders = async () => {
            try {
                const orders = await axios.get(`${import.meta.env.VITE_API}/order/getAllOrders`, {
                    withCredentials: true,
                });
                setOrdersData(orders.data)
            } catch (err) {
                toast.error(err.response.data.message);
            }
        };
        getOrders();
    }, [])

    useEffect(fetchOrders, [fetchOrders]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateData((prev) => ({ ...prev, [name]: value }));
    }

    const openUpdateModal = (order) => {
        setOrderId(order.id);
        setUpdateData({
            number: order.number,
            quantity: order.quantity,
            unit: order.unit,
            description: order.description,
            deadline: order.deadline
        });
        setUpdateModal(true);
    }

    const updateOrder = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API}/order/updateOrder/${orderId}`, {
                number: updateData.number,
                quantity: updateData.quantity,
                unit: updateData.unit,
                description: updateData.description,
                deadline: updateData.deadline
            }, {
                withCredentials: true,
            });
            toast.success(response.data.message);
            setOrdersData(prev => prev.map((order) =>
                orderId == order.id ? {
                    ...order,
                    number: updateData.number,
                    quantity: updateData.quantity,
                    unit: updateData.unit,
                    description: updateData.description,
                    deadline: updateData.deadline
                } : order
            ))
            setUpdateModal(false);
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
        }
    }

    const openDeleteModal = (id) => {
        setOrderId(id);
        setDeleteModal(true);
    }

    const deleteOrder = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API}/order/deleteOrder/${orderId}`);
            toast.success(response.data.message);
            fetchOrders();
            setDeleteModal(false);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <>
            <h1>Comenzi</h1>
            <OrdersTable orders={ordersData} openUpdateModal={openUpdateModal} openDeleteModal={openDeleteModal} />
            {/* Modala de actualizat comanda */}
            <Modal isOpen={updateModal} isClosed={() => setUpdateModal(false)}>
                <h2>Actualizare comandă</h2>
                <div className="form">
                    <form action={updateOrder}>
                        <div className="field">
                            <label>Introduceți numarăul de comandă
                                <input
                                    type="text"
                                    name="number"
                                    value={updateData.number}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="field">
                            <label>Introduceți cantitatea
                                <input
                                    type="text"
                                    name="quantity"
                                    value={updateData.quantity}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="field">
                            <label>Selectați unitatea de măsură
                                <select
                                    name="unit"
                                    id="unit"
                                    onChange={handleChange}
                                    value={updateData.unit}>
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
                                    value={updateData.description}
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
                                    value={new Date(updateData.deadline).toISOString().split("T")[0]}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <button type="submit" onClick={(e) => { e.preventDefault(); updateOrder() }}>Salvează</button>
                    </form>
                </div>
            </Modal>
            <Modal isOpen={deleteModal} isClosed={() => setDeleteModal(false)}>
                <h2>Șterge comanda</h2>
                <p>Sunteți sigur că vreți să ștergeți această comandă?</p>
                <button onClick={() => {deleteOrder()}}>Da</button>
                <button className="cancel-button" onClick={(e) => { e.preventDefault(); setDeleteModal(false)}}>Nu</button>
            </Modal>
        </>

    )
}

export default Orders;