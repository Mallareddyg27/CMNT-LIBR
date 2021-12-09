


function books(clicked){
  console.log(clicked);
  
var b=clicked;
var c=b.lastIndexOf("and");
console.log(c);
var tittle=b.substr(0,c);
var genre=b.substr(c+3);
console.log(tittle);
console.log(genre);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        
    currentuser=user;
    
    firebase.database().ref('book_request/'+tittle ).set({
       email:currentuser.email, 
      genre:genre,
      tittle:tittle,
      uid:currentuser.uid
     },
     (error) => {
      if (error) {
        // The write failed...
      } else {
       alert("request has been submitted succesfully to admin");
      }
    });
    
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

  }


  function signInUser() {
    var email=document.getElementById("inputEmail1").value;
    // ...
    var password=document.getElementById("inputPassword1").value;
     
  
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    
    window.location="fron-page.html";
    //console.log("new User ="+email + "" + password);
  
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    document.getElementById("Sign_in_error").innerHTML=errorMessage;
  });
}

    function logOut(){
        firebase.auth().signOut().then(() => {
      // Sign-out successful.
            
            window.location="sign in.html";
            
    }).catch((error) => {
      // An error happened.
    });
     
        
    
}


//coutesy of firebase authentication documentation
function signUpUser() {
    var email=document.getElementById("inputEmail").value;
    // ...
    var password=document.getElementById("inputPassword").value;
  
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    
   window.location="fron-page.html";
   console.log("new User ="+email + "" + password);
  
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    document.getElementById("Sign_up_error").innerHTML=errorMessage;
    // ..
  });

  

}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
	  
currentuser=user;
userborrowed(currentuser);
document.getElementById("userName").innerHTML=currentuser.email;
firebase.database().ref('users/' + currentuser.uid).set({
    
    email:currentuser.email
  });
  
  firebase.database().ref('users_online/'+currentuser.uid ).set({
    
    email:currentuser.email
  });
    // ...
  } else {
    firebase.database().ref('users_online/'+currentuser.uid ).set({
    
   
    });
      //
   
	
  }

});

function userborrowed(currentuser){
 
  var date=new Date();
  var new_date=new Date(date.getFullYear(), date.getMonth(), date.getDate());
    console.log("here");

  var bookreference=firebase.database().ref().child(currentuser.uid+"/borrowed_books");
  bookreference.on("value",(snapshot)=>{ 
    document.getElementById("borrowed_books_user").textContent="";
    document.getElementById("borrowed_books_user").innerHTML="BORROWED BOOKS";
    snapshot.forEach(function(childsnapshot) {
      var item =childsnapshot.val() 
  
 
  var initial_date2=decodeURIComponent(item.date);
  var initial_date=new Date(initial_date2);
   var days=(((new_date-initial_date)/(3600*1000))/24)+1;
   
   var  adv="";
                    adv+="<div id='B_DIV "+item.tittle+"' class='container' style='border-radius:10px;width:650px; margin-left:15px; box-shadow:1px 1px 1px 1px; background-color:rgb(186, 212, 186); >";
                
                  adv+="<p id='tittle'>"+item.tittle+"</p>";
                    adv+="<p id='author'>Days: "+days+"</p>";
                    adv+="<button id='"+item.tittle+"'class='btn btn-success btn-block' onclick='returnBook(this.id)'> return book</button>"; 
        
                  adv+="<hr>";
                   adv+="</div>";

  document.getElementById("borrowed_books_user").innerHTML+=adv;
  document.getElementById("borrowedbbooks").innerHTML= snapshot.numChildren();

  if(days>=15){
    firebase.database().ref(currentuser.uid+"/overdue_books/"+item.tittle+"/").set({
      tittle: item.tittle,
   
    });
    firebase.database().ref(currentuser.uid+"/borrowed_books/"+item.tittle+"/").set({
     
   
    });
   
    firebase.database().ref("overdue_books/"+item.tittle+"/").set({
      tittle: item.tittle,
      email: currentuser.email,
   uid:currentuser.uid
    });
    firebase.database().ref("accepted_requests/"+item.tittle+"/").set({
     
   
    });
   

  }


  });
}); 



}



function borrowed_books_user(){

  var state=document.getElementById("borrowed_books_user").style.display;  


  document.getElementById("overdue_books_user").style.display='none';
      
  if(state=='none'){
  
  document.getElementById("borrowed_books_user").style.display='inline-block';
  document.getElementById("borrowed_books_user").style.color="red";
  
  }
  else{
  document.getElementById("borrowed_books_user").style.display='none';
  document.getElementById("borrowed_books_user").style.color="red";
  

  }
}

function overduebooks_user(){

  var state=document.getElementById("overdue_books_user").style.display;  

  document.getElementById("borrowed_books_user").style.display='none';

      
  if(state=='none'){
  
  document.getElementById("overdue_books_user").style.display='inline-block';
  document.getElementById("overdue_books_user").style.color="red";
  
  }
  else{
  document.getElementById("overdue_books_user").style.display='none';
  document.getElementById("overdue_books_user").style.color="red";
  

  }
}

function returnBook(clicked){


  console.log(clicked);
  var b= document.getElementById("B_DIV "+clicked+"").innerHTML;
  console.log(b);
  var chu= document.getElementById("B_DIV "+clicked+"").childNodes;
    console.log(chu[0].innerHTML);
    console.log(chu[1].innerHTML);

firebase.database().ref("accepted_requests/"+clicked+"/").set({
    
 
}
,
     (error) => {
      if (error) {
        // The write failed...
      } else {
       alert("you have succesfully returned the book");
      }
    }
);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      
  currentuser=user;
  
  console.log(currentuser.uid);
  firebase.database().ref(uid+"/borrowed_books/"+clicked+"/").set({
    
 
  });
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

}

function overDue(currentuser){

bookreference.on("value",(snapshot)=>{ 
  document.getElementById("overdue_books_user").textContent="";
  var bookreference=firebase.database().ref().child(currentuser.uid+"/overdue_books");
  snapshot.forEach(function(childsnapshot) {
    var item =childsnapshot.val() 
  
var bkrqst="";
bkrqst+="<div id='DIV "+item.tittle+"' class'container' dispay'inline'  style='border-radius:10px;width:650px; margin-left:15px; box-shadow:1px 1px 1px 1px; background-color:rgb(186, 212, 186); >";
bkrqst+="<p>Tittle:</p><br>"; 
bkrqst+="<p>"+ item.tittle+"</p>"; 
bkrqst+="<hr>"; 
bkrqst+="</div>";
console.log(item.tittle);
document.getElementById("overdue_books_user").innerHTML+=bkrqst;
if(snapshot.exists()){
   document.getElementById("badge2").style.display='inline-block';
}
else{
   document.getElementById("badge2").style.display='none';;

}

});
});
}



