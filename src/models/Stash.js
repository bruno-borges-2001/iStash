import {
  getDocumentRef,
  removeValue,
  updateValue,
} from "../plugins/firebase/firestore";
import router from "../router";

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
    _id = null,
    _name = "",
    _shared = false,
    _users = [],
    _products = [],
    _date = null
  ) {
    if (_id) {
      this.id = _id;
      this.name = _name;
      this.shared = _shared;

      this.usersInfo = _users;
      this.users = _users.map((el) => el.uid);
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
    this.users = _users.map((el) => el.uid);

    this.products = _products.map((el) => ({
      id: getDocumentRef("products").id,
      ...el,
    }));

    updateValue("stashes", this.id, {
      name: this.name,
      shared: this.shared,
      users: this.users,
      usersInfo: this.usersInfo,
      products: this.products,
      date: this.date,
    });

    router.replace("/stash/" + this.id);
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
      usersInfo: this.usersInfo,
      products: this.products,
    });
  }

  remove() {
    return removeValue("stashes", this.id);
  }
}
