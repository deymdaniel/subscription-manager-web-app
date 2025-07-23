import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const subscriptionService = {
  // Add a new subscription
  addSubscription: async (userId, subscriptionData) => {
    try {
      const docRef = await addDoc(collection(db, "subscriptions"), {
        ...subscriptionData,
        userId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      throw new Error("Error adding subscription: " + error.message);
    }
  },

  // Update a subscription
  updateSubscription: async (subscriptionId, updates) => {
    try {
      const subscriptionRef = doc(db, "subscriptions", subscriptionId);
      await updateDoc(subscriptionRef, {
        ...updates,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      throw new Error("Error updating subscription: " + error.message);
    }
  },

  // Delete a subscription
  deleteSubscription: async (subscriptionId) => {
    try {
      await deleteDoc(doc(db, "subscriptions", subscriptionId));
    } catch (error) {
      throw new Error("Error deleting subscription: " + error.message);
    }
  },

  // Subscribe to user's subscriptions
  subscribeToUserSubscriptions: (userId, callback) => {
    const q = query(
      collection(db, "subscriptions"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc") // Make sure to create the composite index in Firebase Console
    );

    return onSnapshot(q, callback);
  },
};
