import { Dialog, DialogActions, DialogContent, DialogTitle, Button, InputLabel, TextareaAutosize, FormControl, Box, TextField, Select, MenuItem } from "@mui/material";
import { useState, Fragment } from "react";
import { toast } from "react-toastify";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs";
import productionNoteAPI from "../../../Utils/ProductionNotes";

function CreateProductionNote({ order }) {
    const [open, setOpen] = useState(false);
    const [formData, setFromData] = useState({
        number: "",
        quantity: "",
        unit: "buc",
        deadline: "",
        description: "",
    })

    const [createType, setCreateType] = useState("manually")

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
            const response = await productionNoteAPI.createProductionNote(FormData, order.id);
            toast.success(response.data.message);
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
                Adaugă o notă de producție
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
                <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem", pb: 1 }}>Creează o notă de producție</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
                            Selectați modul prin care doriți să creați
                        </InputLabel>
                        <Select
                            value={createType}
                            onChange={(e) => { setCreateType(e.target.value) }}
                            label="Mod de creat"
                            sx={{
                                fontSize: '1.1rem',
                                color: '#000',
                                padding: '12.5px 14px',
                                '.MuiSelect-select': {
                                    padding: '12.5px 14px',
                                },
                            }}
                        >
                            <MenuItem value="manually">Manual</MenuItem>
                            <MenuItem value="file">Încărcat din fișier</MenuItem>
                        </Select>
                    </FormControl>
                    {
                        createType === "manually" ? (
                            <>
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
                                            order.unit === "buc" ? (
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
                                        Creează
                                    </Button>
                                </DialogActions>
                            </>

                        ) : (<></>)
                    }
                </DialogContent>
            </Dialog>
        </Fragment >
    );
}

export default CreateProductionNote;
