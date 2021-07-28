const multer = require("multer")
const {v4 : uuid4} = require("uuid")

// mnegatur penyimpanan filename
const storages = multer.diskStorage({
    destination: __dirname + "/public/upload",
    filename: (req, file, cb) => {
        cb(null, uuid4() + file.originalname)
    },
})

// hanya menerima image dengan extensi tertentu
const filter = (req, file, cb) => {
    if (
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "text/plain"
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storages,
    fileFilter: filter,
})

module.exports = upload
