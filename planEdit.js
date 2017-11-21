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
    //console.log(snapshot.val());
    snapshot.forEach(function(childSnapshot) {
        // Get goal name
        if(count == 0){
            document.getElementById("goal_name").innerHTML=childSnapshot.val();
            count+=1;
            //console.log()
        }else{
            // Steps the user created  
            var step = childSnapshot.val();
            //console.log(step[0])
            var newCard = $('<div class="card" id="newCard'+count+'"><div class="card-header" id="cardHeader'+count+'"><span id="taskName'+count+'">'+step[0]+'</span><button type="button" onclick="rename(this)" class="btn btn-outline-danger btn-sm right" data-toggle="modal" data-target="#exampleModal">Rename Task</button></div></div>');
            $("#card_container").append(newCard); 
            // increment count 
            count+=1;
        }                        
    });
    
});

//<span></span>
//<button onclick="rename(this)" id="renameStep'+count+'" type="button" class="btn btn-outline-danger btn-sm right">Rename Task</button>


//<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Launch demo modal</button>

// Function gets parent id of card that is being renamed
function rename(elem){
    // get parent
    var card = elem.parentNode.id; 
    var cardID = "#"+card; 
    // get child element aka span
    var textID = $(cardID).children().first().attr("id");      
    // Set specific task id to local storage
    localStorage.setItem("spanID", textID);
}

// Function will set new name of task is user clicks submit
function setName(){
    // get id of span that will be changed from LS       
    var cardID = localStorage.getItem('spanID');
    var IDtoChange = "#"+cardID;
    console.log(IDtoChange);
    var IDnum = IDtoChange.replace ( /[^\d.]/g, '' );
    console.log(IDnum);
    // set users input to task name
    $(IDtoChange).text($("#newName").val());
    
    // Now make changes reflect the database :)
    firebase.database().ref(key).child("step"+IDnum).child('0').set($("#newName").val())
}


//    console.log("DOC ready");
//    $('#renameStep2').on('click', function(event) {
//        console.log('You clicked the Bootstrap Card');
//    });


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
  //localStorage.setItem("step name"+count, step);
  // Set new card  
  $('#new_card'+count).html('<div class="card" id="newCard'+count+'"><div class="card-header" id="cardHeader'+count+'"><span id="taskName'+count+'">'+step+'</span><button type="button" onclick="rename(this)" class="btn btn-outline-danger btn-sm right" data-toggle="modal" data-target="#exampleModal">Rename Task</button></div></div>');
  // Add new step to database
  firebase.database().ref(key).child("step"+count).child('0').set(step);

  //alert("New step was added to DATABASE");
  // increase step counter for unique ids
  count+=1;
}



// Function that will edit the text of the task name
//$('.card').on('click', function(event) {
//     console.log('You clicked the Bootstrap Card');
//});



