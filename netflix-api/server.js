const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const startServer = async () => {
    try {
        await mongoose.connect("mongodb+srv://raihanbashir:p0tat0es@netflix.cffwwsf.mongodb.net/", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB Connected");

        app.use("/api/user", userRoutes);

        app.listen(5000, () => {
            console.log("Server started on port 5000");
        });
    } catch (error) {
        console.error("Error connecting to the database", error);
        process.exit(1); // Exit process with failure
    }
};

startServer();
