import firebaseApp from '../../../utils/firebaseApp.js'
import { getDatabase, ref, onValue, set,get,child, update } from "firebase/database";

export const firebaseInit = (serverData)=>{
    console.log("from firebase init")
    const dbRef = ref(getDatabase());
    get(child(dbRef, `yc8t/`)).then((snapshot) => {
      if (snapshot.exists()) {
        serverData(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}

export const gameData = firebaseInit(serverData=>serverData)