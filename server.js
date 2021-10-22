const PORT = process.env.PORT || 3000;
const server = require("./index.js");
require('dotenv').config();

server.listen(PORT, "0.0.0.0", function(){
    console.log('listening on port: ' + PORT);
});