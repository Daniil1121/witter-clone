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

export enum DeleteTweetState {
  NEVER = "NEVER",
  LOADING = "LOADING",
  ERROR = "ERROR",
}

export interface ITweet {
  _id: string;
  createdAt: string;
  user: {
    fullname: string;
    username: string;
    userAvatar: string;
  };
  text: string;
}

export interface ITweetsState {
  items: ITweet[];
  loadingStatus: LoadingState;
  addedNewTweetStatus: AddingTweetState;
  deleteTweetState: DeleteTweetState;
}
