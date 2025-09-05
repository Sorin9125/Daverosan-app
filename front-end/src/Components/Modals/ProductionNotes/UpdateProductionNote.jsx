import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useState, Fragment } from "react";
import { toast } from "react-toastify";
import productionNoteAPI from "../../../Utils/ProductionNotes";

function UpdateProductionNote({ productionNote, fetchProductionNotes, selectedOrder }) {
    const [open, setOpen] = useState(false);
    const [formData, setFromData] = useState(productionNote)

    const handleClickOpen = (e) => {
        e.currentTarget.blur();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFromData((prev) => ({ ...prev, [name]: value }));
    }

    const createProductionNote = async (e) => {
        e.preventDefault();
        try {
            const response = await productionNoteAPI.updateProductionNote(formData, productionNote.id);
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
                Actualizează nota de producție
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
                <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem", pb: 1 }}>Actualizează nota de producție</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <form onSubmit={createProductionNote} id="creation-form">
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="reper"
                            name="reper"
                            label="Reper"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={formData.reper}
                            onChange={handleChange}
                            slotProps={{
                                inputLabel: {
                                    sx: {
                                        position: 'relative',
                                        transform: 'none',
                                        fontSize: '1.1rem',
                                        color: 'primary.main',
                                        mb: 1,
                                    },
                                },
                                input: {
                                    color: '#000',
                                    fontSize: '1.1rem',
                                    padding: '12.5px 14px',
                                }
                            }}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="scheme"
                            name="scheme"
                            label="Desen"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={formData.scheme}
                            onChange={handleChange}
                            slotProps={{
                                inputLabel: {
                                    sx: {
                                        position: 'relative',
                                        transform: 'none',
                                        fontSize: '1.1rem',
                                        color: 'primary.main',
                                        mb: 1,
                                    },
                                },
                                input: {
                                    color: '#000',
                                    fontSize: '1.1rem',
                                    padding: '12.5px 14px',
                                }
                            }}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="quantity"
                            name="quantity"
                            label="Cantitate"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={formData.quantity}
                            onChange={handleChange}
                            slotProps={{
                                inputLabel: {
                                    sx: {
                                        position: 'relative',
                                        transform: 'none',
                                        fontSize: '1.1rem',
                                        color: 'primary.main',
                                        mb: 1,
                                    },
                                },
                                input: {
                                    color: '#000',
                                    fontSize: '1.1rem',
                                    padding: '12.5px 14px',
                                }
                            }}
                        />
                        {
                            productionNote.order.unit === "buc" ? (
                                <></>
                            ) : (
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="weight"
                                    name="weight"
                                    label="Greutate"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    value={parseFloat(formData.weight)}
                                    onChange={handleChange}
                                    slotProps={{
                                        inputLabel: {
                                            sx: {
                                                position: 'relative',
                                                transform: 'none',
                                                fontSize: '1.1rem',
                                                color: 'primary.main',
                                                mb: 1,
                                            },
                                        },
                                        input: {
                                            color: '#000',
                                            fontSize: '1.1rem',
                                            padding: '12.5px 14px',
                                        }
                                    }}
                                />
                            )
                        }
                    </form>
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
                            type="submit"
                            form="creation-form"
                            variant="contained"
                            sx={{
                                textTransform: "none",
                                fontWeight: "bold",
                                borderRadius: 2,
                                backgroundColor: "primary.main",
                                "&:hover": { backgroundColor: "primary.dark" },
                            }}
                        >
                            Salvează
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Fragment >
    );
}

export default UpdateProductionNote;
