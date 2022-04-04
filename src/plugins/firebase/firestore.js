import firebase from "./index";

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true, merge: true });

const collections = {
  users: db.collection("users"),
};

function getDocumentRef(document) {
  const ref = db.collection(document).doc();
  return ref;
}

async function updateValue(document, id, value) {
  await db.collection(document).doc(id).set(value);
}

function removeValue(document, id) {
  return db.collection(document).doc(id).delete();
}

export default db;

export { collections, getDocumentRef, updateValue, removeValue };
