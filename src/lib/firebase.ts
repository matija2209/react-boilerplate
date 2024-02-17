// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  DocumentData,
  addDoc,
  collection,
  connectFirestoreEmulator,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  connectStorageEmulator,
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "xxxx",
  authDomain: "xxx",
  projectId: "xxxx",
  storageBucket: "xxx",
  messagingSenderId: "xxx",
  appId: "xxxxx",
  measurementId: "xxxx",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

if (process.env.NODE_ENV === "development") {
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}

export const auth = getAuth(app);

export const uploadFileToStorage = async ({
  path,
  file,
  documentId,
}: {
  path: string;
  file: File;
  documentId?: string;
}) => {
  const recordingRef = ref(storage, path);

  // Conditionally set customMetadata based on the presence of documentId
  const metadata = {
    customMetadata: { status: "raw" },
  };

  if (documentId) {
    (metadata.customMetadata as any).documentId = documentId;
  }

  await uploadBytes(recordingRef, file, metadata);
  const url = await getDownloadURL(recordingRef);
  return url;
};

export const deleteImage = async (url: string) => {
  const httpsReference = ref(storage, url);
  await deleteObject(httpsReference);
  return;
};

export const createDocument = async () => {
  const newData = await addDoc(collection(db, "recordings"), {});
  return newData.id;
};
export const updateRecording = async (
  documentId: string,
  data: any
): Promise<string> => {
  const cityRef = doc(db, "recordings", documentId);

  await setDoc(cityRef, { ...data, documentId }, { merge: true });

  return documentId;
};

export const createRecordingsDocument = async ({
  documentId,
  fileName,
  data,
}: {
  documentId?: string | undefined;
  fileName: string;
  data: any;
}) => {
  let recordingCollectionRef;

  if (!documentId) {
    // Create a new document reference with a unique ID in the 'recordings' collection
    const recordingsColRef = collection(db, "recordings");
    recordingCollectionRef = doc(recordingsColRef);
  } else {
    // Use the provided documentId
    recordingCollectionRef = doc(db, "recordings", `${documentId}-${fileName}`);
  }

  const docCreated = await setDoc(
    recordingCollectionRef,
    { ...data, documentId: recordingCollectionRef.id },
    { merge: true }
  );
  return recordingCollectionRef;
};

export const fetchListingImages = async (documentId: string) => {
  const imagesRef = collection(db, "images");

  const q = query(imagesRef, where("listingId", "==", documentId));
  const querySnapshot = await getDocs(q);
  const allData: any = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    allData.push({ id: doc.id, ...doc.data() });
  });

  return allData;
};

export const fetchRecordings = async () => {
  const q = query(collection(db, "recordings")); // where("userId", "==", userId)
  const recordings: DocumentData[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const recordingData = doc.data();
    recordings.push(recordingData);
  });
  return recordings;
};

export const fetchRecording = async (documentId: string) => {
  const docRef = doc(db, "recordings", documentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return undefined;
  }
};

export const deleteRecording = async (documentId: string) => {
  const docRef = doc(db, "recordings", documentId);

  try {
    await deleteDoc(docRef);
    console.log("Document successfully deleted");
    return true; // or you can return a custom message or object
  } catch (error) {
    console.error("Error removing document: ", error);
    return false; // or return the error, depending on your error handling
  }
};
