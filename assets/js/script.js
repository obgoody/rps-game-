console.log("hello")
// ###########replace
var config = {
  apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
  authDomain: "time-sheet-55009.firebaseapp.com",
  databaseURL: "https://time-sheet-55009.firebaseio.com",
  storageBucket: "time-sheet-55009.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var diyTrain = $("#train-name-input").val().trim();
  var diyDestination = $("#destination-input").val().trim();

//   ÷###dd momentjs
  var diyFirst = moment($("#first-input").val().trim(), "MM/DD/YYYY").format("X");


  var empFreq = $("#freq-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newData = {
    train: diyTrain,
    role: diyDestination,
    start: diyFirst,
    rate: diyFreq
  };

  // Uploads employee data to the database
  database.ref().push(newData);

  // Logs everything to console
  console.log(newData.train);
  console.log(newData.destination);
  console.log(newData.first);
  console.log(newData.freq);

  alert("Train Shedule successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#freq-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var diyTrain = childSnapshot.val().train;
  var diyDestination = childSnapshot.val().role;
  var diyFirst = childSnapshot.val().start;
  var diyFreq = childSnapshot.val().rate;

  // Employee Info
  console.log(diyTrain);
  console.log(diyDestination);
  console.log(diyFirst);
  console.log(diyFreq);

  // Prettify the employee start #### check momentjs layout
  var diyTrainPretty = moment.unix(diyTrain).format("MM/DD/YYYY");


//   =====================

//  var tFrequency = 3;

//     // Time is 3:30 AM
//     var firstTime = "03:30";

//     // First Time (pushed back 1 year to make sure it comes before current time)
//     var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
//     console.log(firstTimeConverted);

//     // Current Time
//     var currentTime = moment();
//     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

//     // Difference between the times
//     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//     console.log("DIFFERENCE IN TIME: " + diffTime);

//     // Time apart (remainder)
//     var tRemainder = diffTime % tFrequency;
//     console.log(tRemainder);

//     // Minute Until Train
//     var tMinutesTillTrain = tFrequency - tRemainder;
//     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

//     // Next Train
//     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
//     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // ========================



  // Calculate the months worked using hardcore math
  // To calculate the months worked#########check moment js layout
  var diyMonths = moment().diff(moment(diyFirst, "X"), "months");
  console.log(diyNextArrival);

  // Calculate the total billed rate
  var diyMinutesAway = diyNextArrival * diyFreq;
  console.log(diyMinutesAway);

  // Create the new row
//   #########check this out#####
  var newRow = $("<tr>").append(
    $("<td>").text(diyTrain),
    $("<td>").text(diyDestination),
    $("<td>").text(diyFirst),
    $("<td>").text(diyFreq),
    $("<td>").text(diyNextArrival),
    $("<td>").text(diyMinutesAway)
  );

  // Append the new row to the table
  $("#schedule-table > tbody").append(newRow);
});
