// This JS file is for registering a new app user ---------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set, update, child, get }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNjoC2twOFAa1S3UdWXhlcXcoGbY0aBlw",
    authDomain: "fb-rtd-demo.firebaseapp.com",
    databaseURL: "https://fb-rtd-demo-default-rtdb.firebaseio.com",
    projectId: "fb-rtd-demo",
    storageBucket: "fb-rtd-demo.appspot.com",
    messagingSenderId: "559594481158",
    appId: "1:559594481158:web:8e4141d500c1113b374587"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth();

// Returns instance of your apps' FRD
const db = getDatabase(app);

// ---------------- Register New User --------------------------------//

document.getElementById('submitData').onclick = function() {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('userEmail').value;

  // Firebase requires a password of at least 6 characters
  const password = document.getElementById('userPass').value;

  // Validate the user inputs
  if (!validation(firstName, lastName, email, password)) {
    return;
  }

  // Create new app user using email/password auth
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Create user credential
      const user = userCredential.user;

      // Add user account info to the FRD
      // set() function will create a new ref. or completely replace existing one
      // Each new user will be placed under the 'users' node
      set(ref(db), "user/" + user.uid + "/accountInfo", {
        uid: user.uid, // save userID for home.js reference
        email: email,
        password: encryptPass(password),
        firstname: firstName,
        lastname: lastName,
      })
        .then(() => {
          // Data saved successfully
          alert('User created succesfully!');
        })
        .catch((error) => {
          // The write failed...
          alert(error)
        })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    })
}

// --------------- Check for null, empty ("") or all spaces only ------------//
function isEmptyorSpaces(str){
  return str === null || str.match(/^ *$/) !== null
}

// ---------------------- Validate Registration Data -----------------------//
function validation(firstName, lastName, email, password) {
  let fNameRegex = /^[a-zA-Z]+$/;
  let lNameRegex = /^[a-zA-Z]+$/;
  let emailRegex = /^[a-zA-Z0-9]+@ctemc\.org$/;

  if (isEmptyorSpaces(firstName) || isEmptyorSpaces(lastName) ||
      isEmptyorSpaces(email) || isEmptyorSpaces(password)) {
    alert("Please complete all fields.");
    return false;
  }

  if (!fNameRegex.test(firstName)) {
    alert("The first name should only contain letters.");
    return false;
  }
  if (!lNameRegex.test(lastName)) {
    alert("The last name should only contain letters.");
    return false;
  }
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email.");
    return false;
  }

  return true;
}

// --------------- Password Encryption -------------------------------------//

function encryptPass(password) {
  let encrypted = CryptoJS.AES.encrypt(password, password);
  return encrypted.toString();
}