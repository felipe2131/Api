const mongoose = require("mongoose");
require("dotenv").config();

const URI = `mongodb+srv://${process.env.USERBD}:${process.env.PASSWORDBD}@adso2663798.rans1r5.mongodb.net/${process.env.BD}`
mongoose.connect(URI)
module.exports = mongoose
