require("dotenv").config();
const client = require("./connection");
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

app.use(express.json({ limit: '50mb' }));


// const users = require("./router/users.js");
// app.use("/users", users);

const projects = require("./projects");
app.use("/projects", projects);

const Investors = require("./router/Investors");
app.use("/Investors", Investors);
module.exports = app;

const profile = require("./router/profile.js");
app.use("/profile", profile);

// const backed_projects = require("./router/backed_projects.js");
// app.use("/backed_projects", backed_projects);

// const profile = require("./router/profile.js");
// app.use("/profile", profile);

// const user_campaign = require("./user_campaign");
// app.use("/user_campaign", user_campaign);

module.exports = app;
