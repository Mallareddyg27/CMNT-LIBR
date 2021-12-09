


function adminSignIn() {
         
      
    var email=document.getElementById("inputEmailadmin").value;
     // ...
     var password=document.getElementById("inputPasswordadmin").value;
      
     console.log(email);
     console.log(password);
   firebase.auth().signInWithEmailAndPassword(email, password)
   .then((userCredential) => {
     // Signed in
     var user = userCredential.user;
     if(user.email!="adminlibrary@gmail.com"){

        document.getElementById("admin_error").innerHTML="sorry you are not the admin";
        console.log("you are not the admin");
     }
     else{
     window.location="admin front-page.html";}
     //console.log("new User ="+email + "" + password);
   
     // ...
   })
   .catch((error) => {
     var errorCode = error.code;
     var errorMessage = error.message;
     document.getElementById("sign_in_error").innerHTML=errorMessage;
   });
 }
 
     function logOutadmin(){
         firebase.auth().signOut().then(() => {
       // Sign-out successful.
             
             window.location="admin sign in.html";
     }).catch((error) => {
       // An error happened.
     });   
         
     
 }
