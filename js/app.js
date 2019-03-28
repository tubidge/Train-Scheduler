// Initialize Firebase
var config = {
    apiKey: "AIzaSyBI1RnwXsrsS3tPHpDr4JzX2Rbqmm6TJoI",
    authDomain: "trains-c93a8.firebaseapp.com",
    databaseURL: "https://trains-c93a8.firebaseio.com",
    projectId: "trains-c93a8",
    storageBucket: "",
    messagingSenderId: "699546324929"
};
firebase.initializeApp(config);

var database = firebase.database();
var newTrain = {};

$("#submit").on("click", function (event) {
    event.preventDefault();
    var name = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var time = $("#first-time").val().trim();
    var frequency = $("#frequency").val().trim();

    var now = moment().unix();
    var timeConverted = moment(time, "hh:mm").unix();
    var freqConverted = (frequency * 60);
    var timeDiff = (now - timeConverted);
    var minAway = Math.floor((freqConverted - (timeDiff % freqConverted)) / 60);
    var arrival = moment((now + minAway), "unix").format("HH:mm");



    newTrain = {
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
        arrival: arrival,
        minAway: minAway
    };

    database.ref().push(newTrain);
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-time").val("");
    $("#frequency").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var arrival = childSnapshot.val().arrival;
    var minAway = childSnapshot.val().minAway;
    console.log(`Arrival: ${arrival}`);





    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(arrival),
        $("<td>").text(minAway)
    );

    $(".table").append(newRow);
});