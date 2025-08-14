import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";

function ClientModal({ open, onClose, onSave, client }) {
    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    useEffect(() => {
        if (client) {
            setFormData({
                name: client.name,
                email: client.email,
            })
        } else {
            setFormData({
                name: "",
                email: ""
            })
        }
    }, [client])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () => {
        onSave(formData);
    }

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>
                    {
                        client ? "Actualizează client" : "Creează client"
                    }
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Nume"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        margin="dense"
                        slotProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Anulează</Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        {
                            client ? "Actualizează" : "Creează"
                        }
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ClientModal;