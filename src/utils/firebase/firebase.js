import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { query, orderBy, onSnapshot, getDocs } from "firebase/firestore";

import { collection, addDoc, Timestamp } from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

export const addUser = async (
	firstName,
	lastName,
	email,
	contact,
	address1,
	address2
) => {
	const createdAt = new Date();
	try {
		await addDoc(collection(db, "contacts"), {
			firstName: firstName,
			lastName: lastName,
			email: email,
			contact: contact,
			address1: address1,
			address2: address2,
			isSuperUser: false,
			createdAt
		});
		console.log("Contact registered successfully");
	} catch (err) {
		console.log(err);
	}
};

export const getContactsQuery = async () => {
	const q = await query(
		collection(db, "contacts"),
		orderBy("createdAt", "desc")
	);

	const querySnapshot = await getDocs(q);
	console.log(querySnapshot.docs.map((docSnapshot) => docSnapshot.data()));
	return querySnapshot.docs.map((docSnapshot) => {
		return {
			...docSnapshot.data(),
			id: docSnapshot.id
		};
	});
};

const auth = getAuth();

export const authUser = async (email, password) => {
	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
};

// signInWithEmailAndPassword(auth, email, password)
// 	.then((userCredential) => {
// 		// Signed in
// 		const user = userCredential.user;
// 		console.log(user);
// 		console.log("usuario autenticado com sucesso");
// 		// ...
// 	})
// 	.catch((error) => {
// 		const errorCode = error.code;
// 		console.log("Error Code", errorCode);
// 		const errorMessage = error.message;
// 		console.log("Error Message :", errorMessage);
// 	});
