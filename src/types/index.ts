import Stash from "../models/Stash";
import { Mutation as VuexMutation, MutationTree } from "vuex";

import firebase from "firebase";
import store from "../store";

export interface User {
  uid: string;
  name: string;
  email?: string;
  userStatus: number;
}

export interface Product {
  id: string;
  name: string;
  quantity: number;
  rule: number | null;
  unit: string;
}

export interface Invite {
  id: string;
  message: string;
  stash: Stash;
}

export type Document =
  firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

export type Query = firebase.firestore.Query<firebase.firestore.DocumentData>;

export interface State {
  initialized: boolean;
  // AUTH
  logged: boolean;
  currentUser: any;
  userId: string | null;

  // STASH
  myStashes: Stash[];
  myInvites: Invite[];

  diffs: any[];
  newData: Stash[];

  // OTHER
  stashesLoaded: boolean;
  invitesLoaded: boolean;

  updateData: boolean;
}

export type Mutation = MutationTree<State>;
