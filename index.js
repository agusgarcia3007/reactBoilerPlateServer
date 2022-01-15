const express = require("express");
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

//connect to database
connectDB();

//enable cors
app.use(cors());

//enable json
app.use(express.json({ extended: true }));

//routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`App running on http://localhost:${PORT}`);
});
