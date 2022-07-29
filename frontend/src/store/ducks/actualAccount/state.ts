export interface IActualAccount {
  userAvatar: string;
  name: string;
  fullname: string;
}

export interface IActualAccountState {
  actualAccounts: IActualAccount[];
}
