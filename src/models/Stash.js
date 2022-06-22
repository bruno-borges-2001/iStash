import store from "../store";

import { ACCEPTED, INVITED, REJECTED } from "../helpers/UserStatus";
import {
  getDocumentRef,
} from "../plugins/firebase/firestore";
import router from "../router";
import { debounce } from "../helpers/timingFunctions";

export default class Stash {
  id;
  name;
  shared = false;

  users = [];
  invites = [];
  usersInfo = [];
  products = [];

  date;
  version;

  constructor(
    _id = null,
    _name = "",
    _shared = false,
    _users = [],
    _invites = [],
    _usersInfo = [],
    _products = [],
    _date = null,
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
    _users = [],
    _products = [],
    _version = 0
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

    this.version = _version;

    this.update();

    setTimeout(() => router.replace("/stash/" + this.id));
  }

  buildTemplate() {
    return {
      id: this.id,
      name: this.name,
      shared: this.shared,
      users: this.users,
      invites: this.invites,
      usersInfo: this.usersInfo,
      products: this.products,
      date: this.date,
      version: this.version < 0 ? this.version - 1 : this.version + 1,
    };
  }

  addUser(_user) {
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

  removeUser(_uid) {
    store.commit("disableUpdateData");
    this.users = this.users.filter((el) => el !== _uid);
    this.usersInfo = this.usersInfo.filter((el) => el.uid !== _uid);

    this.update();
  }

  addProduct(_product) {
    store.commit("disableUpdateData");
    this.products.push(_product);

    this.update();
  }

  updateProduct(_id, _newProduct) {
    store.commit("disableUpdateData");
    const index = this.products.findIndex((el) => el.id === _id);

    this.products[index] = _newProduct;

    this.update();
  }

  removeProduct(_id) {
    store.commit("disableUpdateData");
    this.products = this.products.filter((el) => el.id !== _id);

    this.update();
  }

  update() {
    store.commit("updateStash", { id: this.id, value: this.buildTemplate() });
    if (navigator.onLine) {
      debounce(() => {
        if (this.version < 0) this.version - 1;
        else this.version += 1;
      }, 1000);
    }
  }

  remove() {
    store.commit("removeStash", { id: this.id });
  }

  acceptInvite(_id) {
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

  rejectInvite(_id, _del = false) {
    if (!this.invites.includes(_id)) return 999;

    if (!this.usersInfo.find((el) => el.uid === _id)) return 1;

    store.commit("disableUpdateData");

    this.invites = this.invites.filter((el) => el !== _id);

    if (_del) {
      this.usersInfo = this.usersInfo.filter((el) => el.uid !== _id);
    } else {
      const userIndex = this.usersInfo.findIndex((el) => el.uid === _id);
      this.usersInfo[userIndex].userStatus = REJECTED;
    }

    this.update();

    return 0;
  }

  renameStash(_name) {
    store.commit("disableUpdateData");

    this.name = _name;

    this.update();
  }

  setShared(_shared) {
    store.commit("disableUpdateData");

    this.shared = _shared;

    this.update();
  }
}
