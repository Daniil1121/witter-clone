import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { UserCtrl } from "./controllers/UserController";
import { registerValidations } from "./validations/register";
import { passport } from "./core/passport";

import "./core/db";
import { TweetCtrl } from "./controllers/TweetController";

const app = express();

app.use(passport.initialize());
app.use(express.json());

app.get("/users", UserCtrl.index);
app.get("/users/me", passport.authenticate("jwt", { session: false }), UserCtrl.getMyProfile);
app.get("/users/:userId", UserCtrl.show);

app.get("/auth/verify", UserCtrl.verify);
app.post("/auth/login", passport.authenticate("local", { session: false }), UserCtrl.afterLogin);
app.post("/auth/register", registerValidations, UserCtrl.create);

app.get("/tweets/:tweetId", TweetCtrl.show);
app.get("/tweets", TweetCtrl.index);
app.post("/tweets/create", passport.authenticate("jwt", { session: false }), TweetCtrl.create);
app.delete("/tweets/:tweetId", passport.authenticate("jwt", { session: false }), TweetCtrl.delete);
app.patch("/tweets/:tweetId", passport.authenticate("jwt", { session: false }), TweetCtrl.update);

// app.patch("/users", UserCtrl.update);
// app.delete("/users", UserCtrl.delete);

app.listen(process.env.PORT || 8888, (): void => {
  console.log("SERVER RUNNING!");
});
