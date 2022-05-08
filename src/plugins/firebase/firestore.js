import Vue from "vue";
import i18n, { getLocale } from "../vueI18n";
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
  try {
    const lastData = await db.collection(document).doc(id).get();

    if (lastData.data().version > value.version) {
      Vue.notify({
        group: "center",
        title: i18n.messages[getLocale()].keys.warning,
        text: i18n.messages[getLocale()].message.mismatchversion,
        type: "warning",
      });
    } else {
      await db.collection(document).doc(id).set(value);
    }
  } catch (ex) {
    console.log(ex);
  }
}

function removeValue(document, id) {
  return db.collection(document).doc(id).delete();
}

export default db;

export { collections, getDocumentRef, updateValue, removeValue };
