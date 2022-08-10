import { model, Schema } from "mongoose";

export interface ITweetModel {
  _id?: string;
  user: string;
  text: string;
}

export type TweetModelDocumentInterface = ITweetModel & Document;

const tweetSchema = new Schema<ITweetModel>(
  {
    text: {
      type: String,
      require: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const tweetModel = model<TweetModelDocumentInterface>("Tweet", tweetSchema);
