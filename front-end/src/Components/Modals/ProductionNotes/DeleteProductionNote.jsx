import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";
import { useState, Fragment } from "react";
import { toast } from "react-toastify";
import productionNotesAPI from "../../../Utils/ProductionNotes";

function DeleteProductionNote({ productionNote, fetchProductionNotes, selectedOrder }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = (e) => {
        e.currentTarget.blur();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteRequest = async (e) => {
        e.preventDefault();
        try {
            const response = await productionNotesAPI.deleteProductionNote(productionNote.id);
            toast.success(response.data.message);
            fetchProductionNotes(selectedOrder);
            handleClose();
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <Fragment>
            <Button
                size="small"
                variant="contained"
                sx={{
                    textTransform: "none",
                    backgroundColor: "primary.main",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: 2,
                    px: 2.5,
                    py: 1,
                    "&:hover": {
                        backgroundColor: "primary.dark",
                    },
                }}
                onClick={handleClickOpen}
            >
                Șterge notă de producție
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                slotProps={{
                    paper: {
                        sx: { borderRadius: 3, p: 1.5 },
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem", pb: 1 }}>Șterge cerere de ofertă</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Typography>
                        Sunteți sigur că vreți să ștergeți nota de producție de la comanda cu numărul {productionNote.order.number}?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button
                        onClick={handleClose}
                        sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                            backgroundColor: "error.main",
                            borderRadius: 2,
                            color: "text.secondary"
                        }}
                    >Anulează</Button>
                    <Button
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                            borderRadius: 2,
                            backgroundColor: "primary.main",
                            "&:hover": { backgroundColor: "primary.dark" },
                        }}
                        onClick={deleteRequest}
                    >
                        Șterge
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default DeleteProductionNote;
