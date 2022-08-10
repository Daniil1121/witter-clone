import express from "express";
import { validationResult } from "express-validator";
import { IUserModel, userModel } from "./../models/UserModel";
import { generateMD5 } from "./../utils/generateHash";
import { sendEmail } from "./../utils/sendEmail";
import { SentMessageInfo } from "nodemailer/lib/sendmail-transport";
import jwt from "jsonwebtoken";
import { isValid } from "./../utils/isValidObjectId";

class UserController {
  async index(_: any, res: express.Response): Promise<void> {
    try {
      const users = await userModel.find({}).exec();

      res.json({
        status: "success",
        data: users,
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
      const userId = req.params.userId;

      if (!isValid(userId)) {
        res.status(400).send("Invalid user id");
        return;
      }
      const user = await userModel.findById(userId).exec();

      if (!user) {
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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: "error", message: errors.array() });
        return;
      }

      const data: IUserModel = {
        email: req.body.email,
        fullname: req.body.fullname,
        username: req.body.username,
        password: generateMD5(req.body.password + process.env.SECRET_KEY),
        confirm_hash: generateMD5(Math.random().toString(36)),
      };

      const user = await userModel.create(data);
      try {
      } catch (error) {}
      // sendEmail(
      //   {
      //     fromEmail: "admin@twitter.com",
      //     toEMail: data.email,
      //     subject: "Подтверждение почты Twitter",
      //     html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:${
      //       process.env.PORT || 8888
      //     }/auth/verify?hash=${data.confirm_hash}">по этой ссылке</a>`,
      //   },
      //   function (err: Error | null, info: SentMessageInfo) {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //     }
      //   }
      // );

      res.json({
        status: "success",
        message: "the user has been successfully created",
        data: { user },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
  async verify(req: any, res: express.Response): Promise<void> {
    try {
      const hash = req.query.hash;
      if (!hash) {
        res.status(400).send();
      }
      const user = await userModel.findOne({ confirm_hash: hash }).exec();
      if (user) {
        user.confirmed = true;
        user?.save();
        res.json({
          status: "success",
        });
      } else {
        res.status(400).json({
          status: "error",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
  async afterLogin(req: any, res: express.Response): Promise<void> {
    try {
      if (typeof req.user == "string") {
        res.status(400).json({
          status: "error",
          message: req.user,
        });
        return;
      }
      const user = req.user.toJSON();

      res.json({
        status: "success",
        data: {
          user: {
            ...user,
            token: jwt.sign(user, process.env.SECRET_KEY as string, {
              expiresIn: "30d",
            }),
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
  async getMyProfile(req: any, res: express.Response): Promise<void> {
    try {
      res.json({
        status: "success",
        data: req.user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
}

export const UserCtrl = new UserController();
