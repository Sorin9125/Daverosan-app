import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Step } from "@mui/material";
import { useState, Fragment } from "react";
import { toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs";
import offerAPI from "../../../Utils/Offer"

function CreateOffer({ requestID, fetchRequests }) {
    const [open, setOpen] = useState(false);
    const [formData, setFromData] = useState({
        description: "",
        sentAt: new Date(),
    })

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

    const createOffer = async (e) => {
        e.preventDefault();
        try {
            const response = await offerAPI.createOffer(formData, requestID);
            toast.success(response.data.message);
            fetchRequests()
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
                Adaugă o ofertă
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
                <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem", pb: 1 }}>Creează o ofertă</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <form onSubmit={createOffer} id="creation-form">
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="price"
                            name="price"
                            label="Valoarea ofertei (euro)"
                            type="number"
                            fullWidth
                            variant="outlined"
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
                                    inputProps: { step: "any" },
                                    sx: {
                                        color: '#000',
                                        fontSize: '1.1rem',
                                        padding: '12.5px 14px',
                                    },
                                },
                            }}
                        />
                        <DatePicker
                            label="Termen de finalizare"
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
                        Creează
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default CreateOffer;
