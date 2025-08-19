import { TextField, Box } from "@mui/material";

function FieldSearch({ searchTerm, setSearchTerm, setPage }) {
    return (
            <TextField
                label="Caută..."
                variant="outlined"
                size="small"
                sx={{
                    width: 250,
                    bgcolor: "white",
                    borderRadius: 2,
                    boxShadow: 2,
                    "& .MuiOutlinedInput-root": {
                        color: "black",
                    },
                    "& .MuiInputLabel-root": {
                        color: "black",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "primary.main",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "primary.main",
                    },
                }}
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
                placeholder="Caută..."
            />
    )
}

export default FieldSearch;