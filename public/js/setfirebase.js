 // Initialize Firebase
  const fireconfig = {
    apiKey: "AIzaSyAUWRPpLunFjkfgWQ-VOa-rxYBd6hXNvBI",
    authDomain: "movil-app-endika.firebaseapp.com",
    databaseURL: "https://movil-app-endika.firebaseio.com",
    projectId: "movil-app-endika",
    storageBucket: "movil-app-endika.appspot.com",
    messagingSenderId: "1014982577939"
  };
  firebase.initializeApp(fireconfig);

$$(".btnSigninGoogle").click(function(){
	console.log("Google");
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithRedirect(provider).then(function() {
	  firebase.auth().getRedirectResult().then(function(result) {
	    // This gives you a Google Access Token.
	    // You can use it to access the Google API.
	    var token = result.credential.accessToken;
	    // The signed-in user info.
	    var user = result.user;
	    // ...
	  }).catch(function(error) {
	    // Handle Errors here.
	    var errorCode = error.code;
	    var errorMessage = error.message;
	  });
	});
});