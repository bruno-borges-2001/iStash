import {
  getDocumentRef,
  removeValue,
  updateValue,
} from "../plugins/firebase/firestore";
import router from "../router";

import { ACCEPTED, INVITED, REJECTED } from "../helpers/UserStatus";

export default class Stash {
  id;
  name;
  shared = false;

  users = [];
  invites = [];
  usersInfo = [];
  products = [];
  rules = [];

  date;

  constructor(
    _id = null,
    _name = "",
    _shared = false,
    _users = [],
    _invites = [],
    _usersInfo = [],
    _products = [],
    _date = null
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
    } else {
      const ref = getDocumentRef("stashes");
      this.id = ref.id;
      this.date = Date.now();

      this.users = [];
      this.usersInfo = [];
      this.products = [];
    }
  }

  setValues(_name = "", _shared = false, _users = [], _products = []) {
    this.name = _name;
    this.shared = _shared;
    this.usersInfo = _users;

    this.users = _users
      .filter((el) => el.userStatus !== INVITED && el.userStatus !== REJECTED)
      .map((el) => el.uid);

    this.invites = _users
      .filter((el) => el.userStatus === INVITED)
      .map((el) => el.uid);

    this.products = _products.map((el) => ({
      id: getDocumentRef("products").id,
      ...el,
    }));

    updateValue("stashes", this.id, {
      name: this.name,
      shared: this.shared,
      users: this.users,
      invites: this.invites,
      usersInfo: this.usersInfo,
      products: this.products,
      date: this.date,
    });

    router.replace("/stash/" + this.id);
  }

  addUser(_user) {
    this.usersInfo.push(_user);
    if (_user.userStatus === INVITED) this.invites.push(_user.uid);
    else if (_user.userStatus === ACCEPTED) this.users.push(_user.uid);

    this.update();
  }

  removeUser(_uid) {
    this.users = this.users.filter((el) => el !== _uid);
    this.usersInfo = this.usersInfo.filter((el) => el.uid !== _uid);

    this.update();
  }

  addProduct(_product) {
    this.products.push(_product);

    this.update();
  }

  updateProduct(_id, _newProduct) {
    const index = this.products.findIndex((el) => el.id === _id);

    this.products[index] = _newProduct;

    this.update();
  }

  removeProduct(_id) {
    this.products = this.products.filter((el) => el.id !== _id);

    this.update();
  }

  update() {
    updateValue("stashes", {
      id: this.id,
      name: this.name,
      shared: this.shared,
      users: this.users,
      invites: this.invites,
      usersInfo: this.usersInfo,
      products: this.products,
    });
  }

  remove() {
    return removeValue("stashes", this.id);
  }

  acceptInvite(_id) {
    if (!this.invites.includes(_id)) return 999;

    if (!this.usersInfo.find((el) => el.uid === _id)) return 1;

    this.invites.filter((el) => el !== _id);
    this.users.push(_id);

    const userIndex = this.usersInfo.findIndex((el) => el.uid === _id);
    this.usersInfo[userIndex].userStatus = ACCEPTED;

    this.update();

    return 0;
  }
}
