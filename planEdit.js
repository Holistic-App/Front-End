// Get users input from local storage
var ls_iput = localStorage.getItem('goal');

// Convert it to lowercase to avoid any issues
var goal_input = ls_iput.toLowerCase();

// Hard coding the link between the users input and which dataset to pull from firebase
var key = "";

// Checking the users input
if (goal_input == "travel to the bahamas"){
    key = "-KyFNErpdDuwyq1yPK2U"
} else if(goal_input == "plan anniversary dinner"){
    key = "-KyFOs2E1-WDUDl8p2Gx"
} else{
    key = "-KyFPwHlzbtIpro-CblX"
}

// Get reference to root of specific goal
//var rootRef = firebase.database().ref(key);
// Function to get data via for each loop
var count = 0;
firebase.database().ref(key).once('value', function(snapshot) {    
    console.log(snapshot.val());
    snapshot.forEach(function(childSnapshot) {
        // Get goal name
        if(count == 0){
            document.getElementById("goal_name").innerHTML=childSnapshot.val();
            count+=1;
            //console.log()
        }else{
            // Steps the user created  
            var step = childSnapshot.val();
            console.log(step[0])
            var newCard = $('<div class="card"><div class="card-header">'+step[0]+'</div></div>');
            $("#card_container").append(newCard); 
            // increment count 
            count+=1;
        }                        
    });
    
});


// Code below is for adding new steps 

$("#addStepButton").click(function () {
  var blankCard = $('<div class="card" id="new_card'+count+'"><div class="card-header"><form><div class="form-row"><div class="col"><input type="text" class="form-control" placeholder="Write a task name" id="step_input'+count+'"></div><button type="submit" onclick="store()" value="Add Step" id="submit_step" class="btn btn-outline-primary clickable">Add Task</button></div></div></form>');
  $("#card_container").append(blankCard);

});

// JS function to get what user inputs to new step
function store(){
  var step = document.getElementById("step_input"+count).value;
  // If user inputs empty string then alert
  if (step == ''){
      alert("Please enter a valid step name!");
      return false;
  }

  // Set step name to local storage
  localStorage.setItem("step name"+count, step);
  // Set new card
  $('#new_card'+count).html('<div class="card"><div class="card-header">'+step+'</div></div>');
  // Add new step to database
  firebase.database().ref(key).child("step"+count).child('0').set(step);

  //alert("New step was added to DATABASE");
  // increase step counter for unique ids
  count+=1;
}


