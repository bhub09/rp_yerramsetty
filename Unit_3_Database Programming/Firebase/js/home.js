// ----------------- Page Loaded After User Sign-in -------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//

// Import the functions you need from the SDKs you need
<<<<<<< HEAD
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getDatabase, ref, set, update, child, get, remove}
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
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

// Returns instance of your app's FRD
const db = getDatabase(app) 
=======
>>>>>>> f67fba5669ae396c0c3353fc5aef177d1780f0cd



// ---------------------// Get reference values -----------------------------
<<<<<<< HEAD
let userLink = document.getElementById('userLink');    // Username for navbar
let signOutLink = document.getElementById('signOut');  // Sign out link
let welcome = document.getElementById('welcome');      // Welcome header
let currentUser = null;  // Initialize currentUser to null


// ----------------------- Get User's Name'Name ------------------------------
function getUsername(){
    // Grab value for the 'keep logged in' switch
    let keepLoggedIn = localStorage.getItem("keepLoggedIn");

    // Grab user information passed from signIn.js
    if(keepLoggedIn == "yes"){
        currentUser = JSON.parse(localStorage.getItem('user'));
    }
    else{
        currentUser = JSON.parse(sessionStorage.getItem('user'));
    }
}
=======



// ----------------------- Get User's Name'Name ------------------------------
>>>>>>> f67fba5669ae396c0c3353fc5aef177d1780f0cd


// Sign-out function that will remove user info from local/session storage and
// sign-out from FRD

<<<<<<< HEAD
function signOutUser(){
    sessionStorage.removeItem('user');       // clear session storage
    localStorage.removeItem('user');         // Clear local storage of user
    localStorage.removeItem('keepLoggedIn');

    signOutLink(auth).then(() => {
        // Sign-out successful
    }).catch((error) => {
        // Error occurred
    });

    window.location = "home.html";
}

// ------------------------Set (insert) data into FRD ------------------------
function setData(userID, year, month, day, temperature){
    // Must use brackets around variable name to user it as a key
    set(ref(db, 'users/' + userID + '/data/' + year + '/' + month), {
        [day]: temperature
    })
    .then(() => {
        alert("Data stored successfully.");
    })
    .catch((error) => {
        alert("There was an error. Error: " + error);
    });
}


// -------------------------Update data in database --------------------------
function updateData(userID, year, month, day, temperature){
    // Must use brackets around variable name to user it as a key
    update(ref(db, 'users/' + userID + '/data/' + year + '/' + month), {
        [day]: temperature
    })
    .then(() => {
        alert("Data updated successfully.");
    })
    .catch((error) => {
        alert("There was an error. Error: " + error);
    });
}


// ----------------------Get a datum from FRD (single data point)---------------
function getData(userID, year, month, day){

    let yearVal = document.getElementById('yearVal');
    let monthVal = document.getElementById('monthVal');
    let dayVal = document.getElementById('dayVal');
    let tempVal = document.getElementById('tempVal');

    const dbref = ref(db);  // Firebase parameter for getting data

    // Provide the path through the nodes to the data
    get(child(dbref, 'users/' + userID + '/data/' + year + '/' + month)).then((snap) => {
        if(snap.exists()){
            yearVal.textContent = year;
            monthVal.textContent = month;
            dayVal.textContent = day;

            // To get specific value from a key:    snapshot.val()[key]
            tempVal.textContent = snap.val()[day];
        }
        else {
            alert('No data found');
        }
    })
    .catch((error) => {
        alert('Unsuccessful, error: ' + error);
    });

}
=======


// ------------------------Set (insert) data into FRD ------------------------


// -------------------------Update data in database --------------------------


// ----------------------Get a datum from FRD (single data point)---------------
>>>>>>> f67fba5669ae396c0c3353fc5aef177d1780f0cd


// ---------------------------Get a month's data set --------------------------
// Must be an async function because you need to get all the data from FRD
// before you can process it for a table or graph
<<<<<<< HEAD
async function getDataSet(userID, year, month){
    let yearVal = document.getElementById('setYearVal');
    let monthVal = document.getElementById('setMonthVal');

    yearVal.textContent = `Year: ${year}`;
    monthVal.textContent = `Month: ${month}`;

    const days = [];
    const temps = [];
    const tbodyEl = document.getElementById('tbody-2');     // Select <tbody> element

    const dbref = ref(db);  // Firebase parameter for requesting data

    // Wait for all data to be pulled from FRD
    // Must provide the path through the nodes to the data.

    await get(child(dbref, 'users/' + userID + '/data/' + year + '/' + month)).then((snap) => {
        if(snap.exists()){
            console.log(snap.val());

            snap.forEach(child => {
                console.log(child.key, child.val());
                // Push values to corresponding arrays
                days.push(child.key);
                temps.push(child.val());
            });
        }
        else{
            alert('No data found');
        }
    })
    .catch((error) => {
        alert('Unsuccessful, error: ' + error);
    });

    // Dynamically add table rows to HTML using string interppolation
    tbodyEl.innerHTML = '';     // Clear any existing table
    for(let i = 0; i < days.length; i++){
        addItemToTable(days[i], temps[i], tbodyEl)
    }
}

// Add a item to the table of data
function addItemToTable(day, temp, tbody){
    let tRow = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");

    td1.innerHTML = day;
    td2.innerHTML = temp;

    tRow.appendChild(td1);
    tRow.appendChild(td2);

    tbody.appendChild(tRow);

}
=======


// Add a item to the table of data
>>>>>>> f67fba5669ae396c0c3353fc5aef177d1780f0cd



// -------------------------Delete a day's data from FRD ---------------------
<<<<<<< HEAD
function deleteData(userID, year, month, day){
    remove(ref(db, 'users/' + userID + '/data/' + year + '/' + month + '/' + day)).then(() => {
        alert('Data removed successfully')
    })
    .catch((error) => {
        alert('Unsuccessful, err: ' + error);
    });
}


// --------------------------- Home Page Loading -----------------------------
window.onload = function(){




    // ------------------------- Set Welcome Message -------------------------
    getUsername();      // Get current user's first name
    if(currentUser == null){
        userLink.innerText = "Create New Account";
        userLink.classList.replace("nav-link", "btn");
        userLink.classList.add("btn-primary");
        userLink.href = "register.html"

        signOutLink.innerText="Sign In";
        signOutLink.classList.replace("nav-link", "btn");
        signOutLink.classList.add("btn-success");
        signOutLink.href = "signIn.html";
    }

    else{
        userLink.innerText = currentUser.firstname;
        welcome.innerText = "Welcome " + currentUser.firstname;
        userLink.classList.replace("btn", "nav-link");
        userLink.classList.add("btn-primary");
        userLink.href = "#"

        signOutLink.innerText="Sign Out";
        signOutLink.classList.replace("btn", "nav-link");
        signOutLink.classList.add("btn-success");
        document.getElementById('signOut').onclick = function(){
            signOutUser();
        }
    }








// Get, Set, Update, Delete Sharkriver Temp. Data in FRD
// Set (Insert) data function call
document.getElementById('set').onclick = function(){
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    const day = document.getElementById('day').value;
    const temperature = document.getElementById('temperature').value;
    const userID = currentUser.uid;

    setData(userID, year, month, day, temperature);
}


// Update data function call
document.getElementById('update').onclick = function(){
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    const day = document.getElementById('day').value;
    const temperature = document.getElementById('temperature').value;
    const userID = currentUser.uid;

    updateData(userID, year, month, day, temperature);
}


// Get a datum function call
document.getElementById('get').onclick = function(){
    const year = document.getElementById('getYear').value;
    const month = document.getElementById('getMonth').value;
    const day = document.getElementById('getDay').value;
    const userID = currentUser.uid;

    getData(userID, year, month, day);
};

// Get a data set function call
document.getElementById('getDataSet').onclick = function(){
    const year = document.getElementById('getSetYear').value;
    const month = document.getElementById('getSetMonth').value;
    const userID = currentUser.uid;

    getDataSet(userID, year, month);
};

// Delete a single day's data function call
document.getElementById('delete').onclick = function(){
    const year = document.getElementById('delYear').value;
    const month = document.getElementById('delMonth').value;
    const day = document.getElementById('delDay').value;
    const userID = currentUser.uid;

    deleteData(userID, year, month, day);
};

}
=======



// --------------------------- Home Page Loading -----------------------------

  // ------------------------- Set Welcome Message -------------------------

  
  // Get, Set, Update, Delete Sharkriver Temp. Data in FRD
  // Set (Insert) data function call
  

  // Update data function call
  

  // Get a datum function call
  

  // Get a data set function call
  

  // Delete a single day's data function call
  

>>>>>>> f67fba5669ae396c0c3353fc5aef177d1780f0cd
