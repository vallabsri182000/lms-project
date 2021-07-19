const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/signupdetails", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() => {
    console.log(`Conncetion Successful`);
}).catch((e) => {
    console.log(`No Connection`);
});