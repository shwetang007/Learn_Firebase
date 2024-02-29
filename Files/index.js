/* this section in the chapter 1 consists of a challenge which i will be doing throught the process 
i have also used SCRIMBA to get my things done and test it.*/
/*
Challenge:
make it so that when you click the "add to cart" button whater its writeen inside  the box is printed
i.e. gets console logged.*/

/*import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getdatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const Appsettings = {
    databaseURL: "https://learn-firebase-533ee-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(Appsettings)
const database = getdatabase(app)
const itemsindb = ref(database, "Items")


const InputFieldElement = document.getElementById("input-field");
const addButtonElement = document.getElementById("add-button")
addButtonElement.addEventListener("click", function () {
    // Code to execute when the button is clicked
    let inputvalue = InputFieldElement.value
    push(itemsindb, inputvaluSe)
    console.log(`${inputvalue} added to the database`);
});
*/

/*import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const Appsettings = {
    databaseURL: "https://learn-firebase-533ee-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

try {
    const app = initializeApp(Appsettings);
    console.log("Firebase initialized successfully");
} catch (error) {
    console.error("Error initializing Firebase:", error);
}
const app = initializeApp(Appsettings)
const database = getDatabase(app);
const shoppinglistindb = ref(database, "Shopping list");

const InputFieldElement = document.getElementById("input-field");
const addButtonElement = document.getElementById("add-button");

if (addButtonElement) {
    addButtonElement.addEventListener("click", function () {
        let inputValue = InputFieldElement.value;
        push(shoppinglistindb, inputValue)
            .then(() => {
                console.log(`${inputValue} added to the database`);
            })
            .catch(error => {
                console.error("Error adding to the database:", error);
            });
    });
} else {
    console.error("Add button not found in the DOM");
}


*/

/*import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const Appsettings = {
    databaseURL: "https://learn-firebase-533ee-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(Appsettings);
console.log("Firebase initialized successfully");

const database = getDatabase(app);
const shoppinglistindb = ref(database, "Shopping list");

const InputFieldElement = document.getElementById("input-field");
const addButtonElement = document.getElementById("add-button");
const shoppinglistelement = document.getElementById("shopping-list");

addButtonElement.addEventListener("click", function () {
    let inputValue = InputFieldElement.value;
    push(shoppinglistindb, inputValue);
    clearInputFieldElement();
    appendItemShoppingList(inputValue);
});

onValue(shoppinglistindb, function (snapshot) {
    let itemsArray = Object.values(snapshot.val());
    for (let i = 0; i < itemsArray.length; i++)
        console.log(itemsArray[i]);
});

function clearInputFieldElement() {
    InputFieldElement.value = "";
}

function appendItemShoppingList(inputValue) {
    shoppinglistelement.innerHTML += `<li>${inputValue}</li>`;
}

*/

//he above is the code at timestamp at 1:00: 26

/*

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const Appsettings = {
    databaseURL: "https://learn-firebase-533ee-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(Appsettings);
console.log("Firebase initialized successfully");

const database = getDatabase(app);
const shoppinglistindb = ref(database, "Shopping list");

const InputFieldElement = document.getElementById("input-field");
const addButtonElement = document.getElementById("add-button");
const shoppinglistelement = document.getElementById("shopping-list");

addButtonElement.addEventListener("click", function () {
    let inputValue = InputFieldElement.value;
    push(shoppinglistindb, inputValue);
    clearInputFieldElement();
});

onValue(shoppinglistindb, function (snapshot) {
    shoppinglistelement.innerHTML = ""; // Clear the list before re-rendering
    snapshot.forEach((item) => {
        let currentItemID = item.key;
        let currentItemValue = item.val();
        appendItemShoppingList(currentItemValue, currentItemID);
    });
});

function clearInputFieldElement() {
    InputFieldElement.value = "";
}

function appendItemShoppingList(inputValue, currentItemID) {
    let newElement = document.createElement("li");
    newElement.textContent = inputValue;

    newElement.addEventListener("click", function () {
        console.log(currentItemID);
    });

    shoppinglistelement.appendChild(newElement);
}
*/

//he above is the code at timestamp at 1:26:48

/*import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const Appsettings = {
    databaseURL: "https://learn-firebase-533ee-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(Appsettings);
console.log("Firebase initialized successfully");

const database = getDatabase(app);
const shoppinglistindb = ref(database, "Shopping list");

const InputFieldElement = document.getElementById("input-field");
const addButtonElement = document.getElementById("add-button");
const shoppinglistelement = document.getElementById("shopping-list");

addButtonElement.addEventListener("click", function () {
    let inputValue = InputFieldElement.value;
    push(shoppinglistindb, inputValue);
    clearInputFieldElement();
});

onValue(shoppinglistindb, function (snapshot) {
    if (snapshot.exists()) {
        shoppinglistelement.innerHTML = "";
        snapshot.forEach((item) => {
            let currentItemID = item.key;
            let currentItemValue = item.val();
            appendItemShoppingList(currentItemValue, currentItemID);
        });
    } else {
        shoppinglistelement.innerHTML = "Nothing here......yet";
    }
});

function clearInputFieldElement() {
    InputFieldElement.value = "";
}

function appendItemShoppingList(inputValue, currentItemID) {
    let newElement = document.createElement("li");
    newElement.textContent = inputValue;

    newElement.addEventListener("click", function () {
        let exactLocationoftheitemindb = ref(database, `Shopping list/${currentItemID}`);
        remove(exactLocationoftheitemindb);
    });

    shoppinglistelement.appendChild(newElement);
*/



import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const Appsettings = {
    databaseURL: "https://learn-firebase-533ee-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(Appsettings);
console.log("Firebase initialized successfully");

const database = getDatabase(app);
const shoppinglistindb = ref(database, "Shopping list");

const InputFieldElement = document.getElementById("input-field");
const addButtonElement = document.getElementById("add-button");
const shoppinglistelement = document.getElementById("shopping-list");

addButtonElement.addEventListener("click", function () {
    let inputValue = InputFieldElement.value;
    push(shoppinglistindb, inputValue);
    clearInputFieldElement();
});

onValue(shoppinglistindb, function (snapshot) {
    if (snapshot.exists()) {
        shoppinglistelement.innerHTML = "";
        snapshot.forEach((item) => {
            let currentItemID = item.key;
            let currentItemValue = item.val();
            appendItemShoppingList(currentItemValue, currentItemID);
        });
    } else {
        shoppinglistelement.innerHTML = "Nothing here......yet";
    }
});

function clearInputFieldElement() {
    InputFieldElement.value = "";
}

function appendItemShoppingList(inputValue, currentItemID) {
    let newElement = document.createElement("li");
    newElement.textContent = inputValue;

    newElement.addEventListener("click", function () {
        let exactLocationoftheitemindb = ref(database, `Shopping list/${currentItemID}`);
        remove(exactLocationoftheitemindb);
    });

    shoppinglistelement.appendChild(newElement);
}
