import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { query, orderBy, onSnapshot, getDocs } from "firebase/firestore";

import { collection, addDoc, Timestamp } from "firebase/firestore";
const firebaseConfig = {
	apiKey: "AIzaSyBQ21Vcmglh_08R1zlAAVp9s7Ch-wJBLkU",
	authDomain: "dashboard-react-23daa.firebaseapp.com",
	projectId: "dashboard-react-23daa",
	storageBucket: "dashboard-react-23daa.appspot.com",
	messagingSenderId: "80283809651",
	appId: "1:80283809651:web:24bdc45e84a7a0ba69b706"
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
