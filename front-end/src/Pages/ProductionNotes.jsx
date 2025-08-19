import { useCallback, useEffect, useState } from "react";
import ProductionNotesTable from "../Components/Tables/ProductionNotesTable/ProductionNotesTable";
import productionNotesAPI from "../Utils/ProductionNotes";
import ordersAPI from "../Utils/Order";
import { MenuItem, Typography } from "@mui/material";
import SelectSearch from "../Components/Filters/SelectSearch";


function ProductionNotes() {
    const [productionNotesData, setProductionNotesData] = useState([]);
    const [ordersData, setOrdersData] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await ordersAPI.getAllOrders();
                setOrdersData(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchOrders();
    }, []);

    const fetchProductionNotes = useCallback(() => {
        if (selectedOrder) {
            const getProductionNotes = async () => {
                try {
                    const response = await productionNotesAPI.getAllProductionNotes(selectedOrder);
                    setProductionNotesData(response.data);
                } catch (err) {
                    console.error(err);
                }
            }
            getProductionNotes();
        }
    });

    useEffect(fetchProductionNotes, [selectedOrder]);

    return (
        <>
            <Typography sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 4
            }}
                component="h1" variant="h4" fontWeight="bold" gutterBottom
            >Note de producție</Typography>

            <SelectSearch selectedItem={selectedOrder} setSelectedItem={setSelectedOrder}>
                {
                    ordersData.map((order) => (
                        <MenuItem key={order.id} value={order.number}>
                            {order.number}
                        </MenuItem>
                    ))
                }
            </SelectSearch>
            <ProductionNotesTable productionNotes={productionNotesData} fetchProductionNotes={fetchProductionNotes} selectedOrder={selectedOrder}/>
        </>

    )
}

export default ProductionNotes;