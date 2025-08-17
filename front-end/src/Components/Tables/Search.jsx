import { TextField, Box } from "@mui/material";

function Search({ searchTerm, setSearchTerm, setPage }) {
    return (
        <Box sx={{
            mb: 2,
            display: "flex",
            justifyContent: "flex-end",
        }}>
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
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "grey.400", 
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
        </Box>

    )
}

export default Search;