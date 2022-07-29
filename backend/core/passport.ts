import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTstrategy, ExtractJwt } from "passport-jwt";
import { userModel } from "../models/UserModel";
import { generateMD5 } from "./../utils/generateHash";
passport.use(
  new LocalStrategy(async (username, password, done): Promise<void> => {
    try {
      console.log(username);

      const user = await userModel
        .findOne({ $or: [{ email: username }, { username }] })
        .select("+password")
        .exec();

      if (!user) {
        return done(null, "Wrong password or login");
      }

      if (user.password === generateMD5(password + process.env.SECRET_KEY)) {
        return done(null, user);
      } else {
        return done(null, "Wrong password or login");
      }
    } catch (error) {
      return done(null, false);
    }
  })
);
passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      try {
        return done(null, payload);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user?._id);
});

passport.serializeUser((id, done) => {
  userModel.findById(id, (err: any, user: any) => {
    console.log(user);
    done(err, user);
  });
});

export { passport };
