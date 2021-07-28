const { uploader } = require("../configs/cloudinary")

async function uploads(pathFIle) {
    try {
        const result = await uploader.upload(pathFIle, {
            folder: "products",
            use_filename: true,
        })
        return result.url
    } catch (error) {
        throw error
    }
}

module.exports = uploads
