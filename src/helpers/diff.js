/* eslint-disable no-prototype-builtins */
/*!
 * Find the differences between two objects and push to a new object
 * (c) 2019 Chris Ferdinandi & Jascha Brinkmann, MIT License, https://gomakethings.com & https://twitter.com/jaschaio
 * @param  {Object} obj1 The original object
 * @param  {Object} obj2 The object to compare against it
 * @return {Object}      An object of differences between the two
 */

const COMPARE_KEYS = ["name", "quantity", "rule", "unit"];

export function diff(data, local) {
  if (!local) {
    return {};
  }

  var diffs = {};
  var key;

  var compare = function (
    item1,
    item2,
    id,
    name,
    key
  ) {
    if (item1 !== item2) {
      if (!(id in diffs)) diffs[id] = { id: id, name: name };
      diffs[id][key] = { oldValue: item2, newValue: item1 };
    }
  };

  if (data.length > local.length) {
    data.forEach((el) => {
      const localEl = local.find((x) => x.id === el.id);

      if (!localEl) return;

      COMPARE_KEYS.forEach((propName) => {
        compare(
          el[propName],
          localEl[propName],
          el.id,
          el.name,
          propName
        );
      });
    });
  } else {
    local.forEach((el) => {
      const dataEl = data.find((x) => x.id === el.id);

      if (!dataEl) return;

      COMPARE_KEYS.forEach((propName) => {
        compare(
          dataEl[propName],
          el[propName],
          el.id,
          el.name,
          propName
        );
      });
    });
  }

  // Return the object of differences
  return diffs;
}
