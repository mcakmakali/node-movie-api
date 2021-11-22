const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://mcakmakali:245245@cluster0.lzjau.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology:true
    });

    mongoose.connection.on('open', () => {
        console.log("MongoDB: Connected");
    });

    mongoose.connection.on('error', (err) => {
        console.log("MongoDB: Error", err);
    });

    mongoose.Promise = global.Promise;

};