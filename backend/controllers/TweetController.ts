import express from "express";
import { IUserModel, userModel } from "./../models/UserModel";
import { ITweetModel, tweetModel } from "./../models/TweetModel";
import { isValid } from "./../utils/isValidObjectId";

class TweetController {
  async index(_: any, res: express.Response): Promise<void> {
    try {
      const tweets = await tweetModel.find({}).exec();
      const arr: any = [];

      tweets.forEach(async (tweet) => {
        arr.push({
          text: tweet.text,
          user: await userModel.findById({ _id: tweet.user }).exec(),
        });
      });

      res.json({
        status: "success",
        data: tweets,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const tweetId = req.params.tweetId;
      if (!isValid(tweetId)) {
        res.status(400).send("Invalid tweet id");
        return;
      }

      const tweet = await tweetModel.findById({ _id: tweetId }).exec();
      const user = await userModel
        .findById({ _id: tweet?.user })
        .select(["-email", "-confirmed"])
        .exec();

      if (!tweet) {
        res.status(404).send("Couldn't find user by id");
        return;
      }
      res.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
  async create(req: express.Request, res: express.Response) {
    try {
      const user = req.user as IUserModel;

      const data: ITweetModel = {
        text: req.body.text,
        user: user._id!,
      };

      const tweet = await tweetModel.create(data);

      if (tweet) {
        res.status(200).json({
          status: "success",
          message: tweet,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
  async delete(req: express.Request, res: express.Response) {
    try {
      const user = req.user as IUserModel;
      const tweetId = req.params.tweetId;
      if (!isValid(tweetId)) {
        res.status(400).send("Invalid tweet id");
        return;
      }
      const tweet = await tweetModel.findById({ _id: tweetId }).exec();
      if (!tweet) {
        res.status(404).send();
        return;
      }
      if (tweet.user == user._id) {
        tweet.remove();
        res.status(200).send();
      } else {
        res.status(403).send();
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
  async update(req: express.Request, res: express.Response) {
    try {
      const user = req.user as IUserModel;
      const tweetId = req.params.tweetId;
      const newText = req.body.text;

      if (!isValid(tweetId)) {
        res.status(400).send("Invalid tweet id");
        return;
      }

      if (!newText) {
        res.status(400).send();
        return;
      }

      const tweet = await tweetModel.findById({ _id: tweetId }).exec();

      if (tweet) {
        if (tweet.user == user._id) {
          tweet.text = newText;
          tweet.save();
          res.status(200).send(tweet);
        } else {
          res.status(403).send();
        }
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).send();
    }
  }
}

export const TweetCtrl = new TweetController();
