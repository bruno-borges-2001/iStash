import firebase from "./index";

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true, merge: true });

const collections = {
  stashes: db.collection("stashes"),
  users: db.collection("users"),
};

export default db;

export { collections };
