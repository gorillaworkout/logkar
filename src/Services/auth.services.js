import {db} from '../firebase-config'

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
}  from 'firebase/firestore'
const collectionID = 'Auth'
const authCollectionRef = collection(db, collectionID); 
class AuthDataService {
    addAuth = (newAuth) =>{
        return addDoc(authCollectionRef,newAuth)
    }

    updateAuth = (id,updatedAuth)=>{
        const authDoc = doc(db,collectionID,id);
        return updateDoc(authDoc,updatedAuth)
    };

    deleteAuth = (id) =>{
        const authDoc = doc(db,collectionID,id);
        return deleteDoc(authDoc)
    } 

    getAllAuth =()=> {
        return getDocs(authCollectionRef)
    }

    getAuth = (id) =>{
        const authDoc = doc(db,collectionID,id)
        return getDoc(authDoc)
    }

}


export default new AuthDataService();

