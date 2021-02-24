const mongoose = require("mongoose");

const URL = process.env.MONGODB_URL
  ? process.env.MONGODB_URL
  : "mongodb://localhost/blog2";

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("DB is connected");
});
