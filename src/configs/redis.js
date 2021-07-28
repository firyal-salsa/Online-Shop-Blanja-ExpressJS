const redis = require("redis")

class Redis {
    constructor() {
        this.redisDb = redis.createClient({
            host: process.env.REDIS_HOST,
            port: 6379,
            password: process.env.REDIS_PASS,
        })
    }

    check() {
        return new Promise((resolve, reject) => {
            this.redisDb.get("testkey", (err, res) => {
                if (err) {
                    reject(err)
                }

                if (res === "OK" || res === null) {
                    resolve("Connection to redis successfully")
                }
            })
        })
    }
}

module.exports = new Redis()
