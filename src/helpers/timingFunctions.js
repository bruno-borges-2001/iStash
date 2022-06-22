const debounceTimeouts = {};

export function debounce(cb, time, id = "DEFAULT") {
  if (debounceTimeouts[id]) clearTimeout(debounceTimeouts[id]);

  debounceTimeouts[id] = setTimeout(cb, time);
}
