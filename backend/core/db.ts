import mongoose from "mongoose";

mongoose.Promise = Promise;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/twitter",
  options
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connetction error:"));

export { db, mongoose };
