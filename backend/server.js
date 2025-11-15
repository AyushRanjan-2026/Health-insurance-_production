
const express = require("express");
const cors = require("cors");
const body = require("body-parser");
require("dotenv").config();

const claims = require("./routes/claims");
const ipfs = require("./routes/ipfs");

const app = express();
app.use(cors());
app.use(body.json());
app.use("/api/claims", claims);
app.use("/api/ipfs", ipfs);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Backend running on", PORT));
