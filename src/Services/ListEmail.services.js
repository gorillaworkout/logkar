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
const collectionID = 'ListEmail'
const listEmailCollectionRef = collection(db, collectionID); 

class ListEmailDataService {
    getAllEmail = () =>{
        return getDocs(listEmailCollectionRef)
    }
    addEmail = (newAuth) =>{
        return addDoc(listEmailCollectionRef,newAuth)
    }
}


export default new ListEmailDataService();