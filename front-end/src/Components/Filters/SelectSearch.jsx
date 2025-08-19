import { FormControl, InputLabel, Select } from "@mui/material";

function SelectSearch({ selectedItem, setSelectedItem, children }) {
    return (
        <FormControl sx={{ minWidth: 200, mb: 2 }}>
            <InputLabel>Numărul de comandă</InputLabel>
            <Select
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
            >
                {children}
            </Select>
        </FormControl>
    )
}

export default SelectSearch