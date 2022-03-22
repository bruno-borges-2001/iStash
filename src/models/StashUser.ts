export enum UserStatus {
  PENDING = 1,
  ACCEPTED = 2,

  OWNER = 999,
}

export default class StashUser {
  uid: string;
  name: string;
  status: UserStatus;

  constructor(_uid: string, _name: string, _status: UserStatus) {
    this.uid = _uid;
    this.name = _name;
    this.status = _status;
  }
}
