// Get users input from local storage
//var ls_iput = localStorage.getItem('goal');

// Convert it to lowercase to avoid any issues
//var goal_input = ls_iput.toLowerCase();

// Hard coding the link between the users input and which dataset to pull from firebase
//var key = "";

// Checking the users input
/*
if (goal_input == "travel to the bahamas"){
} else if(goal_input == "plan anniversary dinner"){
    key = "-KyFOs2E1-WDUDl8p2Gx"
} else{
    key = "-KyFPwHlzbtIpro-CblX"
}
*/

var key = "-KyFNErpdDuwyq1yPK2U"

// Get reference to root of specific goal
var rootRef = firebase.database().ref(key);

// Function gets values from database and sets them in the HTML code
rootRef.once("value")
    .then(function(snapshot){
       // gets the goal name
       var goal = snapshot.child("id").val();

       // Get the step names and links

       // Step 1
       var step_1 = snapshot.child("step1").val();
       var step_1_name = step_1[0];

       // Step 2
       var step_2 = snapshot.child("step2").val();
       var step_2_name = step_2[0];


       // Step 3
       var step_3 = snapshot.child("step3").val();
       var step_3_name = step_3[0];


       // Setting the titles of steps
       document.getElementById("goal_name").innerHTML=goal;
       //$("#goal_name").text(goal);
       $("#step_1").text(step_1_name);
       $("#step_2").text(step_2_name);
       $("#step_3").text(step_3_name);

      });
