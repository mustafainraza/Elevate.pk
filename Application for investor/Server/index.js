// const http = require("http");
const app = require("./app");
// const config = require("config");
require("dotenv").config();
var cors = require("cors");
app.use(cors());



if (!process.env.TOKEN_KEY) {
    console.error("FATAL ERROR:jwtPrivateKEy is not defined.");
    process.exit(1);
}

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Sever is now listening at port 3000");
});
