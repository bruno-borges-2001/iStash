/* eslint-disable no-prototype-builtins */
/*!
 * Find the differences between two objects and push to a new object
 * (c) 2019 Chris Ferdinandi & Jascha Brinkmann, MIT License, https://gomakethings.com & https://twitter.com/jaschaio
 * @param  {Object} obj1 The original object
 * @param  {Object} obj2 The object to compare against it
 * @return {Object}      An object of differences between the two
 */

import { Product } from "../types";

const COMPARE_KEYS = ["name", "quantity", "rule", "unit"];

export function diff(data: Product[], local: Product[]) {
  if (!local) {
    return {};
  }

  var diffs: { [id: string]: any } = {};
  var key: string;

  var compare = function (
    item1: unknown,
    item2: unknown,
    id: string,
    key: string
  ) {
    if (item1 !== item2) {
      if (!(id in diffs)) diffs[id] = {};
      diffs[id][key] = { oldValue: item2, newValue: item1 };
    }
  };

  if (data.length > local.length) {
    data.forEach((el) => {
      const localEl = local.find((x) => x.id === el.id);

      if (!localEl) {
        diffs[el.id] = { message: "newproduct" };
        return;
      }

      for (key in ["name", "quantity", "rule", "unit"]) {
        if (data.hasOwnProperty(key)) {
          compare(
            el[key as keyof Product],
            localEl[key as keyof Product],
            el.id,
            key
          );
        }
      }
    });
  } else {
    local.forEach((el) => {
      const dataEl = data.find((x) => x.id === el.id);

      if (!dataEl) {
        diffs[el.id] = { message: "removedproduct" };
        return;
      }

      COMPARE_KEYS.forEach((propName) => {
        compare(
          dataEl[propName as keyof Product],
          el[propName as keyof Product],
          el.id,
          propName
        );
      });
    });
  }

  // Return the object of differences
  return diffs;
}
