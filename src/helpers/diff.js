/* eslint-disable no-prototype-builtins */
/*!
 * Find the differences between two objects and push to a new object
 * (c) 2019 Chris Ferdinandi & Jascha Brinkmann, MIT License, https://gomakethings.com & https://twitter.com/jaschaio
 * @param  {Object} obj1 The original object
 * @param  {Object} obj2 The object to compare against it
 * @return {Object}      An object of differences between the two
 */
export function diff(data, local) {
  // Make sure an object to compare is provided
  if (!local || Object.prototype.toString.call(local) !== "[object Object]") {
    return data;
  }

  //
  // Variables
  //

  var diffs = {};
  var key;

  //
  // Methods
  //

  /**
   * Compare two items and push non-matches to object
   * @param  {*}      item1 The first item
   * @param  {*}      item2 The second item
   * @param  {String} key   The key in our object
   */
  var compare = function (item1, item2, id, key) {
    if (item1 !== item2) diff[id][key] = { oldValue: item2, newValue: item1 };
  };

  //
  // Compare our objects
  //

  // Loop through the first object
  if (data.length > local.length) {
    data.forEach((el) => {
      const localEl = local.find((x) => x.id === el.id);

      if (!localEl) diff[el.id][key] = { message: "newproduct" };

      for (key in ["name", "quantity", "rule", "unity"]) {
        if (data.hasOwnProperty(key)) {
          compare(el[key], localEl[key], key);
        }
      }
    });
  } else {
    local.forEach((el) => {
      const dataEl = data.find((x) => x.id === el.id);

      if (!dataEl) diff[el.id][key] = { message: "removedproduct" };

      for (key in ["name", "quantity", "rule", "unity"]) {
        if (data.hasOwnProperty(key)) {
          compare(dataEl[key], el[key], key);
        }
      }
    });
  }

  // Loop through the second object and find missing items
  for (key in local) {
    if (local.hasOwnProperty(key)) {
      if (!data[key] && data[key] !== local[key]) {
        diffs[key] = local[key];
      }
    }
  }

  // Return the object of differences
  return diffs;
}
