const debounceTimeouts: { [key: string]: NodeJS.Timeout } = {};

export function debounce(cb: () => void, time: number, id = "DEFAULT") {
  if (debounceTimeouts[id]) clearTimeout(debounceTimeouts[id]);

  debounceTimeouts[id] = setTimeout(cb, time);
}
