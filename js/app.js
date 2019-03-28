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

$("#submit").on("click", function (event) {
    event.preventDefault();
    var name = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var time = $("#first-time").val().trim();
    var frequency = $("#frequency").val().trim();

    var newTrain = {
        name: name,
        destination: destination,
        time: time,
        frequency: frequency
    };

    database.ref().push(newTrain);
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-time").val("");
    $("#frequency").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var time = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;

    var now = moment().unix();

    // var timeFormatted = moment.unix(time).format("HH:MM");
    console.log(now);

    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency)
    );

    $(".table").append(newRow);
});