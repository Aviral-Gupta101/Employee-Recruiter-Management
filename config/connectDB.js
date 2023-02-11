const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true, 
            useNewUrlParser: true,
        });


    } catch (error) {
        console.error(error);
        console.error("Error in dbConfig.js");
    }

}

module.exports = connectDB; 