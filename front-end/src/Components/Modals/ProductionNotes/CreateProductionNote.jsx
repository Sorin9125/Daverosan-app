import { Dialog, DialogActions, DialogContent, DialogTitle, Button, InputLabel, FormControl, Box, TextField, Select, MenuItem, Typography, TextareaAutosize } from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useState, Fragment } from "react";
import { toast } from "react-toastify";
import productionNoteAPI from "../../../Utils/ProductionNotes";

function CreateProductionNote({ order }) {
    const [open, setOpen] = useState(false);
    const [formData, setFromData] = useState({
        reper: "",
        scheme: "",
        quantity: "",
        weight: 1,
        observations: ""
    })
    const [createType, setCreateType] = useState("manually");
    const [selectedFile, setSelectedFile] = useState(null);

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
            const response = await productionNoteAPI.createProductionNote(formData, order.id);
            toast.success(response.data.message);
            handleClose();
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        handleChange(e);
    };

    const uploadFromFile = async (e) => {
        e.preventDefault();
        const fileData = new FormData();
        fileData.append("file", selectedFile);
        try {
            const response = await productionNoteAPI.uploadFromFile(order.id, fileData);
            toast.success(response.data.message);
            handleClose();
        } catch (err) {
            console.error(err);
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
                                    { order.observations == "" ? 
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
                                                Observații
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
                                                    name="observations"
                                                    placeholder="Observații..."
                                                    value={formData.observations}
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
                                        </FormControl> : <></>
                                    }
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
                                                        inputProps: { step: "any" },
                                                        sx: {
                                                            color: '#000',
                                                            fontSize: '1.1rem',
                                                            padding: '12.5px 14px',
                                                        },
                                                    },
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

                        ) : (
                            <>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
                                    <input
                                        type="file"
                                        id="file-upload"
                                        onChange={handleFileChange}
                                        style={{ display: "none" }}
                                    />
                                    <Typography>
                                        Fișierul trebuie să fie de tip excel și să aibă următoarea structură:
                                        începând din celula A1 pe prima linie să fie în această oridine
                                        coloanele Reper, Port, Desen, Cantitate și Greutate. Coloanele care
                                        au nevoie de o valoare pe fiecare linie sunt Reper, Desen și Cantitate
                                    </Typography>
                                    <label htmlFor="file-upload">
                                        <Button
                                            variant="outlined"
                                            component="span"
                                            startIcon={<AttachFileIcon />}
                                            sx={{
                                                textTransform: "none",
                                                bgcolor: "white",
                                                borderRadius: 2,
                                                boxShadow: 1,
                                                px: 2,
                                                py: 1,
                                                color: "primary.main",
                                                "&:hover": { bgcolor: "grey.100" },
                                            }}
                                        >
                                            {selectedFile ? selectedFile.name : "Alege fișier"}
                                        </Button>
                                    </label>
                                    {selectedFile && (
                                        <Typography variant="body2" color="text.primary">
                                            Fișier selectat: {selectedFile.name}
                                        </Typography>
                                    )}
                                </Box>
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
                                        onClick={uploadFromFile}
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

                        )
                    }
                </DialogContent>
            </Dialog>
        </Fragment >
    );
}

export default CreateProductionNote;
