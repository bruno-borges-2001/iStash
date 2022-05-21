import Vue from "vue";
import i18n from "../vueI18n";
import firebaseSrc from "./index";

import firebase from "firebase";

const { t } = i18n;

const db = firebaseSrc.firestore();

db.settings({ merge: true });

const collections = {
  users: db.collection("users"),
};

function getDocumentRef(
  document: string
): firebase.firestore.DocumentReference<firebase.firestore.DocumentData> {
  const ref = db.collection(document).doc();
  return ref;
}

async function updateValue(document: string, id: string, value: any) {
  try {
    const lastData = await db.collection(document).doc(id).get();

    if (lastData.data()?.version > value.version) {
      Vue.notify({
        group: "center",
        title: t("keys.warning") as string,
        text: t("message.mismatchversion")! as string,
        type: "warning",
      });
    } else {
      const newValue = { ...value };
      if (newValue.version < 0) {
        newValue.version = 1;
      }

      await db.collection(document).doc(id).set(newValue);
    }
  } catch (ex) {}
}

async function removeValue(document: string, id: string) {
  try {
    return db.collection(document).doc(id).delete();
  } catch (ex) {}
}

export default db;

export { collections, getDocumentRef, updateValue, removeValue };
