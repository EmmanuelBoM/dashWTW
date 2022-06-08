import { initializeApp } from "firebase/app";

// Imports from auth
import { 
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
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

const signInWithEmail = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch(error) {
        throw new Error(error.message);
    }
}

const signUpWithEmail = async (name, email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;

        await addDoc(
            collection(db, "users"), {
                uid: user.uid,
                name,
                authProvider: "local",
                email
            }
        )
    } catch(error) {
        throw new Error(error.message);
    }
}

const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Correo enviado")
    } catch(error) {
        throw new Error(error.message);
    }
}

const logout = async (email) => {
    try {
        await signOut(auth);
        alert("Fin de sesión exitoso")
    } catch(error) {
        throw new Error(error.message);
    }
}

export {
    auth,
    db,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    resetPassword,
    logout
} 