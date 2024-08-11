let positiveData = JSON.parse(localStorage.getItem("positiveData")) || [];
let negativeData = JSON.parse(localStorage.getItem("negativeData")) || [];

let formText = "";

// this is so we know if we are dealing with the positive or negative feedback form
let isPositiveForm = true;

document.querySelectorAll("button[type='submit']").forEach(function(button) {
    button.addEventListener("click", function(e) {
        e.preventDefault();
        console.log("button clicked!");

        if (e.target.id === "positiveButton") {
            isPositiveForm = true;
            console.log(document.getElementById("positiveForm"));
            formText = document.getElementById("positiveInput").value;
            
            // this clears the text box after submitting
            document.getElementById("positiveInput").value = ""; 
            displayText(formText, isPositiveForm);
            addTextToLocalStorage(formText, isPositiveForm);
        } else {
            isPositiveForm = false;
            console.log(document.getElementById("negativeForm"));
            formText = document.getElementById("negativeInput").value;
            document.getElementById("negativeInput").value = "";
            displayText(formText, isPositiveForm);
            addTextToLocalStorage(formText, isPositiveForm);
        }
    });
});

function displayText(formText, isPositive) {
    let newListItem = document.createElement("li");
    newListItem.innerHTML = formText;

    if (isPositive) {
        document.getElementById("positiveList").appendChild(newListItem);
    } else {
        document.getElementById("negativeList").appendChild(newListItem);
    }
}

function addTextToLocalStorage(newText, isPositive) {
    const newEntry = {
        text: newText
    };

    if (isPositive) {
        positiveData.push(newEntry);
        localStorage.setItem("positiveData", JSON.stringify(positiveData));
    } else {
        negativeData.push(newEntry);
        localStorage.setItem("negativeData", JSON.stringify(negativeData));
    }

    // Save the data to a JSON file after each submission
    saveFeedbackToJson();
}

// function to save the data to a JSON file
function saveFeedbackToJson() {
    const jsonObject = {
        positiveFeedback: positiveData,
        negativeFeedback: negativeData
    };

    jsonHandler(jsonObject);
}

function jsonHandler(jsonObject) {
    const jsonString = JSON.stringify(jsonObject, null, 2);

    // Use FileSaver.js to save the JSON file
    const blob = Blob([jsonString], { type: "application/json" });
    saveFeedbackToJson(blob, "data.json");
}

