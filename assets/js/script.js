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

  var diyFirst = moment($("#first-input").val().trim(),"HH:mm").format("hh:mm");
  var diyFreq = $("#time-input").val().trim();

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

// 3. Create Firebase event for adding info to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var diyTrain = childSnapshot.val().train;
  var diyDestination = childSnapshot.val().destination;
  var diyFirst = childSnapshot.val().first;
  var diyFreq = childSnapshot.val().freq;


  var timeTest = diyFirst;
  var timeArr = diyFirst.split(":");
  var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
  // var max = moment.max(moment(),trainTime);
  
//  if(max === trainTime){
// console.log("train arriving today");
//  }


  console.log("okeedokee " , timeArr[1]%diyFreq);


  var diyMinutesAway = moment()._d.toString();
  console.log("hello " , diyMinutesAway);
   var diyNextArrival = diyMinutesAway.indexOf(':');
   var time = diyMinutesAway.slice(diyNextArrival - 2, diyNextArrival + 3);
   var hour = time.split(":")[0]
   var min = Number(time.split(":")[1]) + timeArr[0] % diyFreq  ;
   console.log("hellooo" , hour + min);

  // Train Info
  console.log(diyTrain);
  console.log(diyDestination);
  console.log(diyFirst);
  console.log(diyFreq);

  

  // Create the new row
//   #########check this out#####
  var newRow = $("<tr>").append(
    $("<td>").text(diyTrain),
    $("<td>").text(diyDestination),
    $("<td>").text(diyFirst),
    $("<td>").text(diyFreq),
    $("<td>").text(diyNextArrival),
    $("<td>").text(time)
  );

  // Append the new row to the table
  $("#schedule-table > tbody").append(newRow);
});
