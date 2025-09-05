import { Dialog, DialogActions, DialogContent, DialogTitle, Button, FormControl, InputLabel, TextareaAutosize, Box } from "@mui/material";
import { useState, Fragment } from "react";
import { toast } from "react-toastify";
import requestApi from "../../../Utils/Request";
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs";

function UpdateRequest({ request, fetchRequests }) {
    const [open, setOpen] = useState(false);
    const [formData, setFromData] = useState(request)

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

    const updateRequest = async (e) => {
        e.preventDefault();

        try {
            const response = await requestApi.updateRequest(request.id, formData);
            toast.success(response.data.message);
            fetchRequests();
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
                Actualizează cererea de ofertă
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
                <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem", pb: 1 }}>Actualizează cererea de ofertă</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <form onSubmit={updateRequest} id="update-form">
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
                                label="Data când a fost primită"
                                value={dayjs(formData.sentAt)}
                                onChange={(date) => handleChange({ target: { name: 'sentAt', value: date.format('YYYY-MM-DD') } })}
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
                        form="update-form"
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
        </Fragment>
    );
}

export default UpdateRequest;
