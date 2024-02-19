import { deleteUser } from "firebase/auth/cordova";
import { auth, dataBase } from "./firebaseAuth";
import { deleteDoc, doc } from "firebase/firestore";

export default async function deleteUserFromDataBase(){
  try{
    const docRef = doc(dataBase,"users",auth.currentUser.uid)
    await deleteDoc(docRef).then(async ()=> await deleteUser(auth.currentUser)).then(()=> alert("Usuário removido com sucesso"))
  } catch (error){
    throw new Error("Can't remove user")
  }
}