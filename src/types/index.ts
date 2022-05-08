import Stash from "../models/Stash";

import firebase from "firebase";

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
  unity: string;
}

export interface Invite {
  id: string;
  message: string;
  stash: Stash;
}

export type Document =
  firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

export type Query = firebase.firestore.Query<firebase.firestore.DocumentData>;
