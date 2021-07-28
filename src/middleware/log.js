const morgan = require("morgan")
//const { StreamOptions } = require("morgan")
const Logger = require("../helper/Logger")

// const stream = (StreamOptions) => {
//     write: (message) => Logger.http(message)
// }

const skip = () => {
    const env = process.env.NODE_ENV || "development"
    return env !== "development"
}

const morganMiddleware = morgan(":method :url :status :res[content-length] -  respone-time ms",{
    skip,
})

module.exports = morganMiddleware