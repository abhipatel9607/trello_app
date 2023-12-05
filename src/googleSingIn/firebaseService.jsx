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
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// Get all documents in a collection filtered and ordered by a property
export const getAllById = async (
  tableName,
  compareProperty,
  compareValue,
  getOrderBy
) => {
  try {
    const collectionRef = collection(db, tableName);
    const q = query(
      collectionRef,
      where(compareProperty, "==", compareValue),
      orderBy(getOrderBy)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      [`${tableName}Id`]: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(`Error getting all ${tableName}:`, error);
    throw error;
  }
};

// Create a new document in a collection
export const createData = async (data, tableName) => {
  try {
    const collectionRef = collection(db, tableName);
    await addDoc(collectionRef, {
      ...data,
      createdAt: serverTimestamp(),
      editedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(`Error creating ${tableName} data:`, error);
    return error;
  }
};

// Delete a document from a collection
export const deleteRowFromTable = async (tableName, tableId) => {
  try {
    const deleteDocRef = doc(db, tableName, tableId);
    await deleteDoc(deleteDocRef);
  } catch (error) {
    console.error(`Error deleting ${tableName} row:`, error);
    throw error;
  }
};

// Find a document by ID in a collection
export const findById = async (tableName, tableId) => {
  try {
    const docRef = doc(collection(db, tableName), tableId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error finding ${tableName} by ID:`, error);
    throw error;
  }
};

// Update a document in a collection
export const updateData = async (tableName, tableId, updatedData) => {
  try {
    const docRef = doc(db, tableName, tableId);
    await updateDoc(docRef, { ...updatedData, editedAt: serverTimestamp() });
  } catch (error) {
    console.error(`Error updating ${tableName} document:`, error);
    throw error;
  }
};

// Get array of 2 elements by position and next position(card)
export const getCardAndNextCardByPosition = async (
  tableName,
  compareProperty,
  compareValue,
  getOrderBy,
  compareId
) => {
  try {
    const collectionRef = collection(db, tableName);
    const q = query(
      collectionRef,
      where(compareProperty, "in", [compareValue, compareValue + 1]),
      orderBy(getOrderBy)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs
      .map((doc) => ({
        [`${tableName}Id`]: doc.id,
        ...doc.data(),
      }))
      .filter((item) => item.listId === compareId);
  } catch (error) {
    console.error(`Error getting all ${tableName}:`, error);
    throw error;
  }
};

// Get array of 2 elements by position and prev position(card)
export const getCardAndPrevCardByPosition = async (
  tableName,
  compareProperty,
  compareValue,
  getOrderBy,
  compareId
) => {
  try {
    const collectionRef = collection(db, tableName);
    const q = query(
      collectionRef,
      where(compareProperty, "in", [compareValue, compareValue - 1]),
      orderBy(getOrderBy)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs
      .map((doc) => ({
        [`${tableName}Id`]: doc.id,
        ...doc.data(),
      }))
      .filter((item) => item.listId === compareId);
  } catch (error) {
    console.error(`Error getting all ${tableName}:`, error);
    throw error;
  }
};

// Get array of 2 elements by position and next position(list)
export const getListAndNextListByPosition = async (
  tableName,
  compareProperty,
  compareValue,
  getOrderBy,
  compareId
) => {
  try {
    const collectionRef = collection(db, tableName);
    const q = query(
      collectionRef,
      where(compareProperty, "in", [compareValue, compareValue + 1]),
      orderBy(getOrderBy)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs
      .map((doc) => ({
        [`${tableName}Id`]: doc.id,
        ...doc.data(),
      }))
      .filter((item) => item.boardId === compareId);
  } catch (error) {
    console.error(`Error getting all ${tableName}:`, error);
    throw error;
  }
};

// Get array of 2 elements by position and prev position(card)
export const getListAndPrevListByPosition = async (
  tableName,
  compareProperty,
  compareValue,
  getOrderBy
) => {
  try {
    const collectionRef = collection(db, tableName);
    const q = query(
      collectionRef,
      where(compareProperty, "in", [compareValue, compareValue - 1]),
      orderBy(getOrderBy)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      [`${tableName}Id`]: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(`Error getting all ${tableName}:`, error);
    throw error;
  }
};
