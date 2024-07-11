import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

let appSettings = {
  databaseURL:
    "https://appcreation-b85db-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const messageCardinDB = ref(database, "message");
let inputTextEl = document.getElementById("inputText");

let buttonEl = document.getElementById("onclickButton");
let messageContainerEl = document.getElementById("messageContainer");
buttonEl.addEventListener("click", function () {
  let inputValue = inputTextEl.value;

  push(messageCardinDB, inputValue);

  clearInputFieldEl();
});

onValue(messageCardinDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingListEl();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      appendItemToShoppingListEl(currentItem);
    }
  } else {
    messageContainerEl.innerHTML = "No items here... yet";
    messageContainerEl.classList.add("list");
  }
});

function clearShoppingListEl() {
  messageContainerEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appendItemToShoppingListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `message/${itemID}`);

    remove(exactLocationOfItemInDB);
  });

  messageContainerEl.append(newEl);
}
