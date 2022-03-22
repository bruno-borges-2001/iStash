import {
  addValue,
  removeValue,
  updateValue,
} from "../plugins/firebase/firestore";

export default class Stash {
  id;
  name;
  shared = false;

  users = [];
  usersInfo = [];
  products = [];
  rules = [];

  date;

  constructor(
    _name,
    _shared = false,
    _users = [],
    _products = [],
    _rules = [],
    _id = null,
    _date = null
  ) {
    this.name = _name;
    this.shared = _shared;

    this.usersInfo = _users;
    this.users = _users.map((el) => el.uid);
    this.products = _products;
    this.rules = _rules;

    if (_id) {
      this.id = _id;
      this.date = _date;
    } else {
      this.date = Date.now();
      addValue("stashes", {
        name: this.name,
        shared: this.shared,
        users: this.users,
        usersInfo: this.usersInfo,
        products: this.products,
        rules: this.rules,
        date: this.date,
      }).then((id) => {
        this.id = id;
      });
    }
  }

  addUser(_user) {
    this.users.push(_user);

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

  removeProduct(_id) {
    this.products = this.products.filter((el) => el.id !== _id);

    this.update();
  }

  addRule(_rule) {
    this.rules.push(_rule);

    this.update();
  }

  removeRule(_id) {
    this.rules = this.rules.filter((el) => el.id !== _id);

    this.update();
  }

  update() {
    updateValue("stashes", {
      id: this.id,
      name: this.name,
      shared: this.shared,
      users: this.users,
      usersInfo: this.usersInfo,
      products: this.products,
      rules: this.rules,
    });
  }

  remove() {
    return removeValue("stashes", this.id);
  }
}
