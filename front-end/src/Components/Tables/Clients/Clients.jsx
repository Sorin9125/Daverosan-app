import { Fragment, useEffect, useState } from "react";
import "./Clients.css"
import axios from "axios"
import script from "./Client";



function Clients() {
    const [clientData, setClientData] = useState([]);
    const [extraData, setExtraData] = useState({});
    useEffect(() => {
        const getClients = async () => {
            try {
                const clients = await axios.get(`${import.meta.env.VITE_API}/client/getAllClients`);
                setClientData(clients.data);
            } catch (err) {
                console.error(err);
            }
        };
        getClients();
    }, [])

    const clientRequests = async (id) => {
        try {
            const requests = await script.generateRequests(id);
            setExtraData({
                id,
                type: "cereri de ofertă",
                data: requests
            });
        } catch (err) {
            console.error(err);
        }
    }

    const clientOffers = async (id) => {
        try {
            const offers = await script.generateOffers(id);
            setExtraData({
                id,
                type: "oferte",
                data: offers,
            });
        } catch (err) {
            console.error(err);
        }
    }

    const clientOrders = async (id) => {
        try {
            const offers = await script.generateOrders(id);
            setExtraData({
                id,
                type: "comenzi",
                data: offers,
            });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className="table-container">
                <table className="client-table">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Nume</td>
                            <td>Email</td>
                            <td>Cereri</td>
                            <td>Oferte</td>
                            <td>Comenzi</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clientData.map((client) => (
                                <Fragment key={client.id}>
                                    <tr>
                                        <td>{client.id}</td>
                                        <td>{client.name}</td>
                                        <td>{client.email}</td>
                                        <td>
                                            <button onClick={() => clientRequests(client.id)}>Generează</button>
                                        </td>
                                        <td>
                                            <button onClick={() => clientOffers(client.id)}>Generează</button>
                                        </td>
                                        <td>
                                            <button onClick={() => clientOrders(client.id)}>Generează</button>
                                        </td>
                                    </tr>
                                    {extraData.id === client.id && (
                                        <tr className="extra-data-row">
                                            <td colSpan="6">
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
                                                                    <td>{new Date(requests.sentAt).toLocaleDateString()}</td>
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
                                                            {extraData.data.map((offers)=> (
                                                                <tr key={offers.id}>
                                                                    <td>{offers.id}</td>
                                                                    <td>{offers.price}</td>
                                                                    <td>{new Date(offers.deadline).toLocaleDateString()}</td>
                                                                    <td>{offers.isAccepted? "Acceptată" : "Neacceptată"}</td>
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
                                                            {extraData.data.map((order)=> (
                                                                <tr key={order.id}>
                                                                    <td>{order.id}</td>
                                                                    <td>{order.number}</td>
                                                                    <td>{`${order.quantity} ${order.unit}`}</td>
                                                                    <td>{order.description}</td>
                                                                    <td>{new Date(order.deadline).toLocaleDateString()}</td>
                                                                    <td>{order.isCompleted? "Finalizată" : "Nefinalizată"}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            ))
                        }
                    </tbody>
                </table>
            </div>


        </>
    )
}

export default Clients;