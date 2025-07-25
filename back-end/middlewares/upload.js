const multer = require("multer");

const excelFiler = (req, file, cb) => {
    if(file.mimetype.includes("excel") || file.mimetype.include("spreadsheetml")) {
        cb(null, true);
    } else {
        cb("Only excel file allowed", false)
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./files/uploads")
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, `${Date.now()}-${file.originalname}`);
    },
})

var uploadFile = multer({storage: storage, fileFilter: excelFiler});

module.exports = uploadFile;