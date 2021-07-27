import firebase from "firebase";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB6Duj9msScYnCzRqbJX_yyAfzzMXlxmOg",
    authDomain: "yt-clone-project-007.firebaseapp.com",
    projectId: "yt-clone-project-007",
    storageBucket: "yt-clone-project-007.appspot.com",
    messagingSenderId: "863467787349",
    appId: "1:863467787349:web:4c9f3a9437f7374ed930dc"
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();