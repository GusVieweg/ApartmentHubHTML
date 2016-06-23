// filter.js

function whoIsLoggedIn() {
    var myData = JSON.parse(localStorage.getItem('loginInfo')),
        people = ['patty', 'gus', 'chris'],
        result = 0;
    for( var i=0 ; i<3 ; i++ ) {
        var person = people[i];
        if( myData[person].loggedin == 'yes' ) {
            result = person;
        }
    }
    return result;
}

function filter() {
	var myData = JSON.parse(localStorage.getItem('loginInfo'));
	var person = whoIsLoggedIn();
	console.log(person + " is logged in ");
	if( person == 0 ) {
		alert('Please log in to filter this page.');
	} else {
		myData[person].filtered = 'yes';
		localStorage.setItem('loginInfo', JSON.stringify(myData));
		window.location.reload();
	}
}