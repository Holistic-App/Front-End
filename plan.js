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
       var step_1_link_1 = step_1[1];
       var step_1_link_2 = step_1[2];

       // Step 2
       var step_2 = snapshot.child("step2").val();
       var step_2_name = step_2[0];
       var step_2_link_1 = step_2[1];
       var step_2_link_2 = step_2[2];

       // Step 3
       var step_3 = snapshot.child("step3").val();
       var step_3_name = step_3[0];
       var step_3_link_1 = step_3[1];
       var step_3_link_2 = step_3[2];

       // Setting the titles of steps
       $("#goal_name").text(goal);
       $("#step_1").text(step_1_name);
       $("#step_2").text(step_2_name);
       $("#step_3").text(step_3_name);

       // Setting the link for each steps
       $("#s1_link_1").attr("href",step_1_link_1);
       $("#s1_link_2").attr("href",step_1_link_2);

       $("#s2_link_1").attr("href",step_2_link_1);
       $("#s2_link_2").attr("href",step_2_link_2);

       $("#s3_link_1").attr("href",step_3_link_1);
       $("#s3_link_2").attr("href",step_3_link_2);

      });



// use counter to create unique IDs for each new step that is added to web page and DB
var step_counter = 4;
// Function that will add a blank card when user clicks "Add Step" button
$("#addCard").click(function () {
  var blankCard = $('<div class="card" id="new_card'+step_counter+'"><div class="card-header"><form><div class="form-row"><div class="col"><input type="text" class="form-control" placeholder="Write a task name" id="step_input'+step_counter+'"></div><button type="submit" onclick="store()" value="Add Step" id="submit_step" class="btn btn-outline-primary clickable">Add Task</button></div></div></form>');
  $("#card_container").append(blankCard);

});

$("#addCard2").click(function () {
  var blankCard = $('<div class="card" id="new_card'+step_counter+'"><div class="card-header"><form><div class="form-row"><div class="col"><input type="text" class="form-control" placeholder="Write a task name" id="step_input'+step_counter+'"></div><button type="submit" onclick="store()" value="Add Step" id="submit_step" class="btn btn-outline-primary clickable">Add Task</button></div></div></form>');
  $("#card_container").append(blankCard);

});

// JS function to get what user inputs to new step
function store(){
  var step = document.getElementById("step_input"+step_counter).value;
  // If user inputs empty string then alert
  if (step == ''){
      alert("Please enter a valid step name!");
      return false;
  }

  // Set step name to local storage
  localStorage.setItem("step name"+step_counter, step);
  // Set new card
  $('#new_card'+step_counter).html('<div class="card" id="card'+step_counter+'"><div class="card-header">'+step+'<button id="delete_task" type="button" class="btn btn-outline-danger btn-sm right btn-listener-'+step_counter+'" onclick="hide(this)">X</button></div></div>');
  // Add new step to database
  rootRef.child("step"+(step_counter)).child('0').set(step);

  // alert("New step was added to DATABASE");
  // increase step counter for unique ids
  step_counter+=1;

}


// Removes element from html and database
function hide(elem) {
    // This will remove HTML element
    console.log(elem.parentNode.parentNode.id);
    var cardToDeleteID = "#"+(elem.parentNode.parentNode.id);
    $(cardToDeleteID).remove();

    // This will remove specific step from database
    var IdToDelete = cardToDeleteID.replace ( /[^\d.]/g, '' );
    console.log(IdToDelete);
    firebase.database().ref(key).child("step"+IdToDelete).remove();
    console.log("Step was Removed!");
}


$("#addCard").click(function(){
    console.log("Add Step Button Clicked!");
    tracker = ga.getAll()[0];
    tracker.send('event', 'button', 'click');
});


$("#addStepButton").click(function(){
    console.log("Add Card Button Clicked!");
    tracker = ga.getAll()[0];
    tracker.send('event', 'button', 'click');
});

/*$(".btn-listener-1").click(function(){
    $("#card1").hide();
});

$(".btn-listener-2").click(function(){
    $("#card2").hide();
});

$(".btn-listener-3").click(function(){
    $("#card3").hide();
});

$(".btn-listener-"+step_counter).click(function(){
    console.log("this ran");
    $("#card"+step_counter).hide();
});*/
