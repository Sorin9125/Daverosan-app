import { Dialog, DialogActions, DialogContent, DialogTitle, Button, InputLabel, TextareaAutosize, FormControl, Box, TextField, Select, MenuItem } from "@mui/material";
import { useState, Fragment } from "react";
import { toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs";
import orderAPI from "../../../Utils/Order"

function UpdateOrder({ order, fetchOrders }) {
    const [open, setOpen] = useState(false);
    const [formData, setFromData] = useState(order);

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

    const updateOrder = async (e) => {
        e.preventDefault();
        try {
            const response = await orderAPI.updateOrder(formData, order.id);
            toast.success(response.data.message);
            fetchOrders()
            handleClose();
        } catch (err) {
            console.log(err);
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
                Actualizează comanda
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
                <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem", pb: 1 }}>Actualizează comanda</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <form onSubmit={updateOrder} id="creation-form">
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="number"
                            name="number"
                            label="Număr de comandă"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            value={formData.number}
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
                            id="value"
                            name="value"
                            label="Valoare totală"
                            type="number"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            value={parseFloat(formData.value)}
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
                            onChange={handleChange}
                            value={parseFloat(formData.quantity)}
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
                        <FormControl fullWidth variant="outlined" margin="dense">
                            <InputLabel
                                sx={{
                                    position: 'relative',
                                    transform: 'none',
                                    fontSize: '1.1rem',
                                    color: 'primary.main',
                                    mb: 1,
                                }}
                            >
                                Descriere
                            </InputLabel>
                            <Box sx={{
                                width: '100%',
                                border: '1px solid rgba(0,0,0,0.23)',
                                borderRadius: 1,
                                backgroundColor: '#fff',
                                maxHeight: 150,
                                overflowY: 'auto',
                                padding: '0 14px',
                                boxSizing: 'border-box',
                            }}>
                                <TextareaAutosize
                                    minRows={3}
                                    name="description"
                                    placeholder="Descriere..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        fontSize: '1.1rem',
                                        color: '#000',
                                        padding: '12.5px 0',
                                        border: 'none',
                                        outline: 'none',
                                        resize: 'none',
                                        backgroundColor: 'transparent',
                                        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                                    }}
                                />
                            </Box>
                        </FormControl>
                        <DatePicker
                            label="Termen de finalizare"
                            value={dayjs(formData.deadline)}
                            onChange={(date) => handleChange({ target: { name: 'deadline', value: date.format('YYYY-MM-DD') } })}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    required: true,
                                    variant: 'outlined',
                                    sx: {
                                        '& .MuiInputLabel-root': {
                                            position: 'relative',
                                            transform: 'none',
                                            fontSize: '1.1rem',
                                            color: 'primary.main',
                                            mb: 1,
                                        },
                                        '& .MuiOutlinedInput-input': {
                                            color: '#000',
                                            fontSize: '1.1rem',
                                            padding: '12.5px 14px',
                                        },
                                    },
                                },
                            }}
                        />
                    </form>
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
            </Dialog>
        </Fragment >
    );
}

export default UpdateOrder;
