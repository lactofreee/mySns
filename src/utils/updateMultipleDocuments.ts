/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  collection,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const UpdateMultipleDocuments = async (
  uid:string,
  newUserName:string,
) => {
  const batch = writeBatch(db);
  const q = query(collection(db, "tweets"), where("userId", "==", uid));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const docRef = doc.ref;
    batch.update(docRef, { username: newUserName });
  });
  await batch.commit();
};

export default UpdateMultipleDocuments;
