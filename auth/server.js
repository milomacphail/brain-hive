const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const db = require("./config/default").mongoURI;

const posts = require("./routes/posts");

mongoose
  .connect(db)
  .then(() => console.log("db connected successfully"))
  .catch((error) => console.error("failed to connect to db", error));

app.use(cors());
app.use(express.json());

app.use("/api/posts", posts);

const port = process.env.PORT || 6020;

app.listen(port, () => console.log(`server listening on port ${port}`));