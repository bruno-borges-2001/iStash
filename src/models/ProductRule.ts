import StashProduct from "./StashProduct";

import db from "../plugins/firebase/firestore";

export enum WarnLevel {
  INFO = 0,
  WARNING,
  ALERT,
}

export default class ProductRule {
  id: string;
  product: string;
  quantity: number;

  message: string;
  warnLevel: WarnLevel;

  constructor(
    _product: StashProduct,
    _quantity: number,
    _warnLevel: WarnLevel,
    _message?: string
  ) {
    const { id } = db.collection("rules").doc();

    this.id = id;
    this.product = _product.id;
    this.quantity = _quantity;
    this.warnLevel = _warnLevel;

    this.message =
      _message ||
      `Produto ${_product.label} está abaixo da quantidade recomendada`;
  }
}
