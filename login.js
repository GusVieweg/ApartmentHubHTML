// login.js

function showLogin() {
	$('#loginBlock').show();
}

function selectPerson(person) {
	console.log('selected ' + person);
	var myData = JSON.parse(localStorage.getItem('loginInfo'));
	$('#'+person+'Login').css('background-color', 'black');
	if( myData[person] === "default_password" ) {
		console.log(myData[person]);
		$('#createYourPassword').show();
		myData[person] = 'creating_password';
	} else {
		console.log('entering password');
		$('#enterYourPassword').show();
	}
	localStorage.setItem('loginInfo', JSON.stringify(myData));
}

function validateForm() {
	var myData = JSON.parse(localStorage.getItem('loginInfo'));
    var x = document.forms["passwordForm"]["password"].value;
    var people = ['patty', 'gus', 'chris'];
    if (x == null || x == "") {
        alert("Password must be filled out");
        //return false;
    } else {
    	for( var i=0; i<3 ; i++ ) {
    		var person = people[i];
    		if( myData[person] === 'creating_password' ) {
    			console.log("setting " + myData[person] + " to " + x );
    			myData[person] = x;
    			break;
    		}
    	}
    	$('#createYourPassword').hide();
    	$('#loginBlock').hide();
    	//return true;
    }
    localStorage.setItem('loginInfo', JSON.stringify(myData));
}