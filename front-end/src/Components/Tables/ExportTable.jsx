import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'
import { Button } from "@mui/material"
import DownloadIcon from '@mui/icons-material/Download';

function ExportTable({ title, columns, data, fileName }) {
    const exportPDF = () => {
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "pt",
            format: "a4"
        });

        const titleFontSize = 22;
        doc.setFontSize(titleFontSize);
        doc.setFont(undefined, "bold");

        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = doc.getTextWidth(title);
        const x = (pageWidth - textWidth) / 2;
        const titleY = 50
        doc.text(title, x, titleY);

        doc.setFont(undefined, "normal");

        autoTable(doc, {
            startY: titleY + 20,
            head: [columns.map((col) => col.header)],
            body: data.map(row => columns.map(col => row[col.accessor])),
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: [41, 128, 185], textColor: 255 },
            alternateRowStyles: { fillColor: [240, 240, 240] },
        });

        doc.save(fileName);
    };

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={exportPDF}
            sx={{ textTransform: "none" }}
        >
            Exportă ca PDF
        </Button>
    )
}

export default ExportTable;