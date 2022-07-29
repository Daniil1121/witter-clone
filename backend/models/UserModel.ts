import { model, Schema } from "mongoose";

export interface IUserModel {
  _id?: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
  confirm_hash: string;
  confirmed?: boolean;
  location?: string;
  about?: string;
  website?: string;
  userAvatar?: string;
}

export type UserModelDocumentInterface = IUserModel & Document;

const userSchema = new Schema<IUserModel>(
  {
    email: {
      unique: true,
      require: true,
      type: String,
    },
    fullname: {
      require: true,
      type: String,
    },
    username: {
      unique: true,
      require: true,
      type: String,
    },

    password: {
      require: true,
      type: String,
      select: false,
    },
    confirm_hash: {
      require: true,
      type: String,
      select: false,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    location: String,
    about: String,
    website: String,
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: function (_, obj) {
    delete obj.password;
    delete obj.confirm_hash;
    return obj;
  },
});

export const userModel = model<UserModelDocumentInterface>("User", userSchema);
