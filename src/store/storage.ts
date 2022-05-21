import localForage from 'localforage';
import { State } from '../types';

const store = localForage.createInstance({
  name: 'app',
});

const mapStateForCache = (state: State) => {
  return state
};

export const setState = (state: State) => {
  const cachedState = mapStateForCache(state);
  return store.setItem('state', cachedState);
};

export const getState = () => store.getItem('state');

export const deleteState = () => store.removeItem('state');