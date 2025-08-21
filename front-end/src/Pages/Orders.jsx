import { useCallback, useEffect, useState } from "react";
import OrdersTable from "../Components/Tables/OrdersTable/OrdersTable";
import orderAPI from "../Utils/Order";
import { Typography } from "@mui/material";

function Orders() {
    const [ordersData, setOrdersData] = useState([]);

    const fetchOrders = useCallback(() => {
        const getOrders = async () => {
            try {
                const response = await orderAPI.getAllOrders();
                setOrdersData(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        getOrders();
    }, []);

    useEffect(fetchOrders, [fetchOrders]);

    return (
        <>
            <Typography sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 4
            }}
                component="h1" variant="h4" fontWeight="bold" gutterBottom
            >Comenzi</Typography>
            <OrdersTable orders={ordersData} fetchOrders={fetchOrders} />
        </>

    )
}

export default Orders;