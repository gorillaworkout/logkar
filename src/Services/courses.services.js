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
const collectionID = 'Courses'
const CoursesCollectionRef = collection(db, collectionID); 
class CoursesDataService {
    addCourses = (newAuth) =>{
        return addDoc(CoursesCollectionRef,newAuth)
    }

    updateCourses = (id,updatedCourses)=>{
        const CoursesDoc = doc(db,collectionID,id);
        return updateDoc(CoursesDoc,updatedCourses)
    };

    deleteCourses = (id) =>{
        const CoursesDoc = doc(db,collectionID,id);
        return deleteDoc(CoursesDoc)
    }

    getAllCourses =()=> {
        return getDocs(CoursesCollectionRef)
    }

    getCourses = (id) =>{
        const CoursesDoc = doc(db,collectionID,id)
        return getDoc(CoursesDoc)
    }

}


export default new CoursesDataService();

