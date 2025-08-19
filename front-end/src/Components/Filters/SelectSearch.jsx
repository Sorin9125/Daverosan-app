import { FormControl, InputLabel, Select } from "@mui/material";

function SelectSearch({ selectedItem, setSelectedItem, children }) {
    return (
        <FormControl margin="dense" variant="outlined" sx={{ minWidth: 200, mb: 2 }}>
            <InputLabel
                sx={{
                    position: 'relative',
                    transform: 'none',
                    fontSize: '1.1rem',
                    color: 'primary.main',
                    mb: 1,
                }}
            >Numărul de comandă</InputLabel>
            <Select
                label="Număr comandă"
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                sx={{
                    fontSize: "1.1rem",
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    ".MuiSelect-select": {
                        padding: "12.5px 14px",
                    },
                }}
            >
                {children}
            </Select>
        </FormControl>
    )
}

export default SelectSearch