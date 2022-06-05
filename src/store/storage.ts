import localForage from 'localforage';
import { State } from '../types';

const store = localForage.createInstance({
  name: 'app',
});

export const setState = (state: State) => {
  return store.setItem('state', state);
};

export const getState = () => store.getItem('state');

export const deleteState = () => store.removeItem('state');