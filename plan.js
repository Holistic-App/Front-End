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





