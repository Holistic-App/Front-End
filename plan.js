
var goal_input = localStorage.getItem('goal');

var key = "";

if (goal_input == "learn to salsa dance"){
    key = "-KyDx3B3TnxyXJfbneu3"
} else if(goal_input == "plan anniversary dinner"){
    key = "-KyDxOh_hjx5-sdrj-TS"
} else{
    key = "-KyDy23bRE_cSXr-1TsD"
}

var rootRef = firebase.database().ref(key);

// Function gets values from database and sets them in the HTML code
rootRef.once("value")
    .then(function(snapshot){
       var goal = snapshot.child("id").val();
       var step_1 = snapshot.child("step1").val();
       var step_2 = snapshot.child("step2").val();
       
       $("#goal_name").text(goal);
       $("#step_1").text(step_1);
       $("#step_2").text(step_2);
      });





