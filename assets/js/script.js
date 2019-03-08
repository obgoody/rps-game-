console.log("hello")

var config = {
    apiKey: "AIzaSyBjmD3AxT2YG3nmtna4Hdg1L3oTVa82d1Y",
    authDomain: "train-schedule-32e68.firebaseapp.com",
    databaseURL: "https://train-schedule-32e68.firebaseio.com",
    projectId: "train-schedule-32e68",
    storageBucket: "",
    messagingSenderId: "730356922851"
  };
  

firebase.initializeApp(config);

var database = firebase.database();

// 2. Buttons
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var diyTrain = $("#train-name-input").val().trim();
  var diyDestination = $("#destination-input").val().trim();

//   ÷###dd momentjs
//   var diyFirst = moment($("#first-input").val().trim(), "MM/DD/YYYY").format("X");
  var diyFirst = $("#first-input").val().trim();
  var diyFreq = $("#freq-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newData = {
    train: diyTrain,
    destination: diyDestination,
    first: diyFirst,
    freq: diyFreq
  };

  // Uploads database
  database.ref().push(newData);

  
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

  // Prettify #### check momentjs layout####

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
//   var diyMonths = moment().diff(moment(diyFirst, "X"), "months");
//   console.log(diyNextArrival);

//   // Calculate the total billed rate
//   var diyMinutesAway = diyNextArrival * diyFreq;
//   console.log(diyMinutesAway);

  // Create the new row
//   #########check this out#####
  var newRow = $("<tr>").append(
    $("<td>").text(diyTrain),
    $("<td>").text(diyDestination),
    $("<td>").text(diyFirst),
    $("<td>").text(diyFreq),
    // $("<td>").text(diyNextArrival),
    // $("<td>").text(diyMinutesAway)
  );

  // Append the new row to the table
  $("#schedule-table > tbody").append(newRow);
});
