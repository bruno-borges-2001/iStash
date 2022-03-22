import firebase from "./index";

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true, merge: true });

const collections = {
  users: db.collection("users"),
};

function addValue(document, value) {
  const ref = db.collection(document).doc();

  updateValue(document, ref.id, { id: ref.id, ...value });

  return ref.id;
}

async function updateValue(document, id, value) {
  await db.collection(document).doc(id).set(value);
}

export default db;

export { collections, addValue, updateValue };
