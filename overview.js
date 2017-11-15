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
        }
        else if (count < 4){
            // Steps with links
            $("#step_"+count).text(step[0]); 
            count+=1;    
        }
        else{
            count+=1;
            // increment count 
            var newCard = $('<div class="card-header" ><div class="form-check" style="float:left;"><label class="form-check-label"><input name="progress" class="progress" type="checkbox" value="25"></label></div><h3>'+step[0]+'</h3></div><div class="collapse" id="card1">  <div class="card-body"><a id="s1_link_1" href="" role="button" class="btn btn-outline-dark">Groupon.com</a><a id="s1_link_2" href="" role="button" class="btn btn-outline-dark">Yelp Reviews</a></div></div>');
            var step = childSnapshot.val();
            // Steps the user created  
            $("#cardContainer").append(newCard); 
      });
         
          
    $("#check1").click(function(){
        var element = document.getElementById("step_1");
        if(element.style.getPropertyValue("text-decoration") == "line-through"){
            element.style.setProperty("text-decoration", "none");
          }
        else{
            element.style.setProperty("text-decoration", "line-through");            
          }    
        });
        
    $("#check2").click(function(){
        var element = document.getElementById("step_2");
         if(element.style.getPropertyValue("text-decoration") == "line-through"){
            element.style.setProperty("text-decoration", "none");            
        }
        else{
            element.style.setProperty("text-decoration", "line-through");            
        }
    });
    
    $("#check3").click(function(){
        var element = document.getElementById("step_3");
        if(element.style.getPropertyValue("text-decoration") == "line-through"){
            element.style.setProperty("text-decoration", "none");            
        }
        else{
            element.style.setProperty("text-decoration", "line-through");            
        }   
     });
    

    //Manipulates the value of progress bar 
    //based on the maximum values of the checkbox
    $('input').click( function(){
        var val = 0 
        $('input:checked').each(function(){
            if ( $(this).attr('value') > val )
            {
                val =  $(this).attr('value');
            }       
        }); 
        $('.progress-bar').css('width', (val)+'%').attr('aria-valuenow', val);    
      });

