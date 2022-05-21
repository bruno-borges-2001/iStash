import store from '../store'

import { ACCEPTED, INVITED, REJECTED } from "../helpers/UserStatus";
import {
  getDocumentRef,
  removeValue,
  updateValue,
} from "../plugins/firebase/firestore";
import router from "../router";
import { debounce } from "../helpers/timingFunctions";
import { Product, User } from "../types";

export default class Stash {
  id: string;
  name?: string;
  shared = false;

  users: string[] = [];
  invites: string[] = [];
  usersInfo: User[] = [];
  products: Product[] = [];

  date: number | null;
  version: number;

  constructor(
    _id: string | null = null,
    _name = "",
    _shared = false,
    _users: string[] = [],
    _invites: string[] = [],
    _usersInfo: User[] = [],
    _products: Product[] = [],
    _date: number | null = null,
    _version = 1
  ) {
    if (_id) {
      this.id = _id;
      this.name = _name;
      this.shared = _shared;

      this.usersInfo = _usersInfo;
      this.users = _users;
      this.invites = _invites;
      this.products = _products;
      this.date = _date;
      this.version = _version;
    } else {
      const ref = getDocumentRef("stashes");
      this.id = ref.id;
      this.date = Date.now();

      this.users = [];
      this.usersInfo = [];
      this.products = [];
      this.version = 0;
    }
  }

  setValues(
    _name = "",
    _shared = false,
    _users: User[] = [],
    _products: Product[] = []
  ) {
    this.name = _name;
    this.shared = _shared;
    this.usersInfo = _users;

    this.users = _users
      .filter((el) => el.userStatus !== INVITED && el.userStatus !== REJECTED)
      .map((el) => el.uid);

    this.invites = _users
      .filter((el) => el.userStatus === INVITED)
      .map((el) => el.uid);

    this.products = _products;

    this.update();

    router.replace("/stash/" + this.id);
  }

  buildTemplate() {
    return {
      name: this.name,
      shared: this.shared,
      users: this.users,
      invites: this.invites,
      usersInfo: this.usersInfo,
      products: this.products,
      date: this.date,
      version: this.version + 1,
    };
  }

  addUser(_user: User) {
    store.commit("disableUpdateData");

    let index;
    if ((index = this.usersInfo.findIndex((el) => el.uid === _user.uid)) >= 0) {
      this.usersInfo[index].userStatus = _user.userStatus;
    } else {
      this.usersInfo.push(_user);
    }

    if (_user.userStatus === INVITED) this.invites.push(_user.uid);
    else if (_user.userStatus === ACCEPTED) this.users.push(_user.uid);

    this.update();
  }

  removeUser(_uid: string) {
    store.commit("disableUpdateData");
    this.users = this.users.filter((el) => el !== _uid);
    this.usersInfo = this.usersInfo.filter((el) => el.uid !== _uid);

    this.update();
  }

  addProduct(_product: Product) {
    store.commit("disableUpdateData");
    this.products.push(_product);

    this.update();
  }

  async updateProduct(_id: string, _newProduct: Product) {
    store.commit("disableUpdateData");
    const index = this.products.findIndex((el) => el.id === _id);

    this.products[index] = _newProduct;

    await this.update();
  }

  removeProduct(_id: string) {
    store.commit("disableUpdateData");
    this.products = this.products.filter((el) => el.id !== _id);

    this.update();
  }

  async update() {
    await updateValue("stashes", this.id, this.buildTemplate()).then(() =>
      debounce(() => (this.version += 1), 5000)
    ).finally(() => {
      store.commit("enableUpdateData")
    });
  }

  remove() {
    store.commit("disableUpdateData");
    return removeValue("stashes", this.id).finally(() => store.commit("enableUpdateData"));
  }

  acceptInvite(_id: string) {
    if (!this.invites.includes(_id)) return 999;

    if (!this.usersInfo.find((el) => el.uid === _id)) return 1;

    store.commit("disableUpdateData");

    this.invites = this.invites.filter((el) => el !== _id);
    this.users.push(_id);

    const userIndex = this.usersInfo.findIndex((el) => el.uid === _id);
    this.usersInfo[userIndex].userStatus = ACCEPTED;

    this.update();

    return 0;
  }

  rejectInvite(_id: string, del = false) {
    if (!this.invites.includes(_id)) return 999;

    if (!this.usersInfo.find((el) => el.uid === _id)) return 1;

    store.commit("disableUpdateData");

    this.invites = this.invites.filter((el) => el !== _id);

    if (del) {
      this.usersInfo = this.usersInfo.filter((el) => el.uid !== _id);
    } else {
      const userIndex = this.usersInfo.findIndex((el) => el.uid === _id);
      this.usersInfo[userIndex].userStatus = REJECTED;
    }

    this.update();

    return 0;
  }

  renameStash(newName: string) {
    store.commit("disableUpdateData");

    this.name = newName;

    this.update();
  }

  setShared(val: boolean) {
    store.commit("disableUpdateData");

    this.shared = val;

    this.update();
  }
}
