require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/users.route");
const connect_db = require("./config/mysql.config");

app.use(express.json());
app.use("/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
