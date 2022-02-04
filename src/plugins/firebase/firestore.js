import firebase from "./index";

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true, merge: true });

const collections = {
  users: db.collection("users"),
};

export default db;

export { collections };
