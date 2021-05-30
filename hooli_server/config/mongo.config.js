let config = {
    "mongo" : {
        "connString": `mongodb+srv://${process.env.DB_USERNAME}:${process.env.MONGO_KEY}@hoolicluster.cep6t.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority` 
    }
}

module.exports = config
