import localForage from 'localforage';

const store = localForage.createInstance({
  name: 'app',
});

export const setState = (state) => {
  return store.setItem('state', state);
};

export const getState = () => store.getItem('state');

export const deleteState = () => store.removeItem('state');