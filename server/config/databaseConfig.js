const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on("connected", () => console.log("connected successfully"));
connection.on("error", (error) => console.log("cannot connect", error));

module.exports = mongoose;