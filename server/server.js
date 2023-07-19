const express = require("express");
const app = express();
require("dotenv").config();

const databaseConfig = require("./config/databaseConfig");
app.use(express.json());

// user route
const userRoute = require("./routes/userRoute");
// admin route
const adminRoute = require("./routes/adminRoute");
// doctor route
const doctorRoute = require("./routes/doctorRoute");

app.disable('etag');   // avoid 304 not modifier
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Running on port ${port}`));