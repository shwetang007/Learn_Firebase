// Import Firebase modules for App and Database
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Firebase configuration settings
const Appsettings = {
    databaseURL: "https://learn-firebase-533ee-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase app with the configuration settings
const app = initializeApp(Appsettings);
console.log("Firebase initialized successfully");

// Access the Firebase database
const database = getDatabase(app);

// Reference to the "Shopping list" location in the database
const shoppinglistindb = ref(database, "Shopping list");

// DOM elements
const InputFieldElement = document.getElementById("input-field");
const addButtonElement = document.getElementById("add-button");
const shoppinglistelement = document.getElementById("shopping-list");

// Event listener for the "Add to Cart" button
addButtonElement.addEventListener("click", function () {
    let inputValue = InputFieldElement.value;

    // Push the input value to the "Shopping list" location in the database
    push(shoppinglistindb, inputValue);

    // Clear the input field
    clearInputFieldElement();
});

// Event listener for changes in the "Shopping list" location in the database
onValue(shoppinglistindb, function (snapshot) {
    if (snapshot.exists()) {
        // Clear the existing shopping list in the HTML
        shoppinglistelement.innerHTML = "";

        // Iterate through each item in the database snapshot
        snapshot.forEach((item) => {
            let currentItemID = item.key;
            let currentItemValue = item.val();

            // Append the item to the shopping list in the HTML
            appendItemShoppingList(currentItemValue, currentItemID);
        });
    } else {
        // Display a message if the shopping list is empty
        shoppinglistelement.innerHTML = "Nothing here......yet";
    }
});

// Function to clear the input field
function clearInputFieldElement() {
    InputFieldElement.value = "";
}

// Function to append an item to the shopping list in the HTML
function appendItemShoppingList(inputValue, currentItemID) {
    let newElement = document.createElement("li");
    newElement.textContent = inputValue;

    // Event listener to remove the item from the database on click
    newElement.addEventListener("click", function () {
        let exactLocationoftheitemindb = ref(database, `Shopping list/${currentItemID}`);

        // Remove the item from the database
        remove(exactLocationoftheitemindb);
    });

    // Append the new element to the shopping list in the HTML
    shoppinglistelement.appendChild(newElement);
}
