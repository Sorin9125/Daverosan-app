import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'
import { Button } from "@mui/material"
import DownloadIcon from '@mui/icons-material/Download';

function ExportTable({ title, columns, data, fileName, extraInfo }) {
    const exportPDF = () => {
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "pt",
            format: "a4"
        });

        const lines = title ? title.split("\n") : ["Export"];
        const titleFontSize = 22;
        doc.setFontSize(titleFontSize);
        doc.setFont(undefined, "bold");

        const pageWidth = doc.internal.pageSize.getWidth();
        let titleY = 50;

        lines.forEach(line => {
            const textWidth = doc.getTextWidth(line);
            const x = (pageWidth - textWidth) / 2;
            doc.text(line, x, titleY);
            titleY += titleFontSize + 5;
        });

        doc.setFont(undefined, "normal");


        if (extraInfo && extraInfo.length > 0) {
            const extraFontSize = 12;
            doc.setFontSize(extraFontSize);
            doc.setFont(undefined, "normal");

            titleY += 5; 

            for (let infoLine of extraInfo) {
                doc.text(infoLine, 40, titleY);
                titleY += extraFontSize + 2; 
            }

            titleY += 5; 
        }

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
            sx={{ textTransform: "none", borderRadius: "12px 12px 0 0" }}
        >
            Exportă ca PDF
        </Button>
    )
}

export default ExportTable;