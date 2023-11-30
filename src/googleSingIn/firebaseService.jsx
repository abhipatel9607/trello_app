/** @format */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getAllById = async (tableName, compareProperty, compareValue) => {
  const boardsCollectionRef = collection(db, tableName);
  const q = query(
    boardsCollectionRef,
    where(compareProperty, "==", compareValue),
    orderBy("createdAt")
  );
  const boardData = await getDocs(q);
  return boardData.docs.map((doc) => ({
    [`${tableName}Id`]: doc.id,
    ...doc.data(),
  }));
};

export const createData = async (data, tableName) => {
  const boardsCollectionRef = collection(db, tableName);
  const newDocRef = await addDoc(boardsCollectionRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
  console.log(newDocRef);
};

export const deleteRowFromTable = async (tableName, tableId) => {
  const deleteBoardRow = doc(db, tableName, tableId);
  await deleteDoc(deleteBoardRow);
};

export const findById = async (tableName, tableId) => {
  const boardRef = doc(collection(db, tableName), tableId);
  const boardSnapshot = await getDoc(boardRef);

  if (boardSnapshot.exists()) {
    const boardData = boardSnapshot.data();
    return boardData;
  } else {
    console.log("Document does not exist");
    return null;
  }
};
