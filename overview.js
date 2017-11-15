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
       //document.getElementById("goal_name").innerHTML=goal;
       //$("#goal_name").text(goal);
       //$("#step_1").text(step_1_name);
       //$("#step_2").text(step_2_name);
       //$("#step_3").text(step_3_name);

      });


      $('input[type="checkbox"]').click(function() {
        $(this).child().attr('disabled', this.checked);
    });

// Function to get data via for each loop
firebase.database().ref(key).on('value', function(snapshot) {
    
    var count = 0;
    //console.log(snapshot.val());
    snapshot.forEach(function(childSnapshot) {
        // Get goal name
        if(count == 0){
            document.getElementById("goal_name").innerHTML=childSnapshot.val();
            count+=1;
        }else if (count < 4){
            // Steps with links
            var step = childSnapshot.val();
            $("#step_"+count).text(step[0]); 
            count+=1;    
        }else{
            alert("Adding steps that user inputted");
            // Steps the user created  
            var step = childSnapshot.val();
            alert(step[0]);
            var newCard = $('<div class="card-header" ><div class="form-check" style="float:left;"><label class="form-check-label"><input name="progress" class="progress" type="checkbox" value="25"></label></div><h3>'+step[0]+'</h3></div><div class="collapse" id="card1">  <div class="card-body"><a id="s1_link_1" href="" role="button" class="btn btn-outline-dark">Groupon.com</a><a id="s1_link_2" href="" role="button" class="btn btn-outline-dark">Yelp Reviews</a></div></div>');
            $("#cardContainer").append(newCard); 
            //$("#step_"+count).text(step[0]); 
            count+=1;
        }
        console.log(childSnapshot.val());                 
    });
    
});
