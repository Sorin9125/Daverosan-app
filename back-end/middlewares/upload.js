const multer = require("multer");
const fs = require("fs");
const path = require("path");

const excelFiler = (req, file, cb) => {
    if(file.mimetype.includes("excel") || file.mimetype.includes("spreadsheetml")) {
        cb(null, true);
    } else {
        cb("Only excel file allowed", false)
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, "..", "files", "uploads");
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, "./files/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
})

var uploadFile = multer({storage: storage, fileFilter: excelFiler});

module.exports = uploadFile;