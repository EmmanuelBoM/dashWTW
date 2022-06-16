import { initializeApp } from "firebase/app";

// Imports from auth
import { 
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

// Imports from firestore
import {
    query,
    collection,
    where,
    getDocs,
    addDoc,
    getFirestore
} from "firebase/firestore";


const firebaseConfig = JSON.parse(process.env.REACT_APP_ACCESS_KEY);
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const response = await signInWithPopup(auth, googleProvider);
        const user = response.user;

        const q = query(
            collection(db, "users"),
            where("uid", "==", user.uid)
        );
        const docsRef = await getDocs(q);
        if(docsRef.docs.length === 0){
            await addDoc(
                collection(db, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email
                }
            )
        }
    } catch(error) {
        throw new Error(error.message);
    }
}

const logout = async (email) => {
    try {
        await signOut(auth);
    } catch(error) {
        throw new Error(error.message);
    }
}

export {
    auth,
    db,
    signInWithGoogle,
    logout
} 