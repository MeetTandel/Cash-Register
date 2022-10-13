let billAmount = document.querySelector("#bill-amount");
const cashGiven = document.querySelector("#cash-given");
const nextButton = document.querySelector("#next");
const checkButton = document.querySelector("#check-button");
const message = document.querySelector("#error-message");
const hideCashGiven = document.querySelector(".hide-cash-given");
const noOfNotes = document.querySelectorAll(".no-of-notes");
const noteCol = document.querySelectorAll(".note-col");
const displayTable = document.querySelector(".change-table");

const availableNotes = [2000, 500, 100, 20, 10, 5, 1];

billAmount.addEventListener("input", () => {
  hideCashGiven.style.display = "none";
  displayTable.style.display = "none";
  cashGiven.value = "";
  showMessage("")
});

nextButton.addEventListener("click", function () {
  if (billAmount.value === "") {
    showMessage("Enter Bill Amount");
  }else if (Number(billAmount.value) < 0) {
    showMessage("The bill amount should be greater than 0");
  } else {
    hideCashGiven.style.display = "flex";
  }
});

checkButton.addEventListener("click",
  function validateBillsAmountAndCashAmount() {
    hideMessage();
    let amount = Number(billAmount.value);
    let cash = Number(cashGiven.value);

    if (amount >= 0) {
      if (cash > amount) {
        const change = cash - amount;
        showMessage(`The change to be returned is ${change}`);
        calculateChange(change);
        displayTable.style.display = "block";
      } else if (amount === cash) {
        showMessage("No change to return");
        displayTable.style.display = "none";
      } else {
        showMessage("Do you wanna wash plates?");
        displayTable.style.display = "none";
      }
    } else {
      showMessage("The bill amount should be greater than 0");
    }
  }
);

function calculateChange(change) {
  availableNotes.forEach((notes, i) => {
    noOfNotes[i].innerText = "";
    const numberOfNotes = Math.trunc(change / availableNotes[i]);
    change %= availableNotes[i];
    if (numberOfNotes >= 1) {
      noteCol[i].style.display = "table-cell";
      noOfNotes[i].style.display = "table-cell";
      noOfNotes[i].innerText = numberOfNotes;
    } else {
      noteCol[i].style.display = "none";
      noOfNotes[i].style.display = "none";
    }
  });
}
function hideMessage() {
  message.style.display = "none";
}

function showMessage(msg) {
  message.style.display = "block";
  message.innerText = msg;
}
