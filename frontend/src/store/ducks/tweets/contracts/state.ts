export enum LoadingState {
  LOADED = "LOADED",
  LOADING = "LOADING",
  ERROR = "ERROR",
  NEVER = "NEVER",
}

export enum AddingTweetState {
  LOADED = "LOADED",
  LOADING = "LOADING",
  ERROR = "ERROR",
}

export interface ITweet {
  _id: string;
  user: {
    fullname: string;
    name: string;
    userAvatar: string;
  };
  text: string;
}

export interface ITweetsState {
  items: ITweet[];
  loadingStatus: LoadingState;
  addedNewTweetStatus: AddingTweetState;
}
