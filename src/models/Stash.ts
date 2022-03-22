import ProductRule from "./ProductRule";
import StashProduct from "./StashProduct";
import StashUser from "./StashUser";

import { addValue, updateValue } from "../plugins/firebase/firestore";

export default class Stash {
  id: string;
  name: string;
  shared: boolean = false;

  users: Array<StashUser> = [];
  products: Array<StashProduct> = [];
  rules: Array<ProductRule> = [];

  constructor(
    _name: string,
    _shared: boolean = false,
    _users: Array<StashUser> = [],
    _products: Array<StashProduct> = [],
    _rules: Array<ProductRule> = []
  ) {
    this.name = _name;
    this.shared = _shared;

    this.users = _users;
    this.products = _products;
    this.rules = _rules;

    addValue("stashes", {
      name: this.name,
      users: this.users,
      products: this.products,
      rules: this.rules,
    });
  }

  addUser(_user: StashUser) {
    this.users.push(_user);

    this.update();
  }

  removeUser(_uid: string) {
    this.users = this.users.filter((el) => el.uid !== _uid);

    this.update();
  }

  addProduct(_product: StashProduct) {
    this.products.push(_product);

    this.update();
  }

  removeProduct(_id: string) {
    this.products = this.products.filter((el) => el.id !== _id);

    this.update();
  }

  addRule(_rule: ProductRule) {
    this.rules.push(_rule);

    this.update();
  }

  removeRule(_id: string) {
    this.rules = this.rules.filter((el) => el.id !== _id);

    this.update();
  }

  update() {
    updateValue({
      id: this.id,
      name: this.name,
      users: this.users,
      products: this.products,
      rules: this.rules,
    });
  }
}
