dbPassword = 'mongodb+srv://sannonthachai:chai41742@cluster0-ne5td.mongodb.net/test?retryWrites=true'
setMongoose = { useCreateIndex: true , useNewUrlParser: true , useFindAndModify: false }
secretJWT = 'CRIMSON_SECRET_KEY'

module.exports = {
    mongoURI: dbPassword,
    set: setMongoose,
    secret: secretJWT
}