import { DatePicker } from "@mui/x-date-pickers";
import { Box } from "@mui/material";

function DateSearch({ startDate, setStartDate, endDate, setEndDate, setPage }) {
    return (
        <Box sx={{ display: "flex", gap: 2 }}>
            <DatePicker
                label="De la"
                value={startDate}
                onChange={(newDate) => { setStartDate(newDate); setPage(0); }}
                slotProps={{
                    textField: {
                        size: "small",
                        sx: {
                            width: 200,
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
                        },
                    },
                }}
            />

            <DatePicker
                label="Până la"
                value={endDate}
                onChange={(newDate) => { setEndDate(newDate); setPage(0); }}
                slotProps={{
                    textField: {
                        size: "small",
                        sx: {
                            width: 200,
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
                        },
                    },
                }}
            />
        </Box>
    )
}

export default DateSearch;
