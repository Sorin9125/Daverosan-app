import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";
import { useState, Fragment } from "react";
import { toast } from "react-toastify";
import offerAPI from "../../../Utils/Offer";

function DeleteOffer({ offer, fetchOffers }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = (e) => {
        e.currentTarget.blur();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteOffer = async (e) => {
        e.preventDefault();
        try {
            const response = await offerAPI.deleteOffer(offer.id);
            toast.success(response.data.message);
            fetchOffers();
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
                Șterge oferta
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
                <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem", pb: 1 }}>Șterge oferta</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Typography>
                        Sunteți sigur că vreți să ștergeți oferta trimisă către {offer.request.client.name}?
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
                        onClick={deleteOffer}
                    >
                        Șterge
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default DeleteOffer;
