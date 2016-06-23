// ahub.js

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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

function loadEntries(entry) {
	var entryStorage = entry+'sStorage',
		entryOwner = entry+'Owner',
		entries = entry+'s',
		capEntry = capitalizeFirstLetter(entry);
	var myData = JSON.parse(localStorage.getItem(entryStorage)),
		loginData = JSON.parse(localStorage.getItem('loginInfo')),
		people = ['patty', 'gus', 'chris'],
		potentialPerson = whoIsLoggedIn(),
		filtered = false;
	for( var j=0 ; j<3 ; j++ ) {
		$('#' + entry + j).parent().hide();
	}
	$("#no"+capEntry+'s').hide();
	if( (potentialPerson == 0 )||(loginData[potentialPerson].filtered == 'no') ) {
		if( myData.maxEntries > 0 ) {
			for( j=0 ; j<3 ; j++ ) {
				var person = people[j],
					entry0 = entry + '0';
				document.getElementById(entry + j).innerHTML = myData[entries][person][entry0];
				document.getElementById(entryOwner+j).innerHTML = person.charAt(0).toUpperCase();
				if( typeof myData[entries][person][entry0] !== 'undefined' ) {
					$('#' + entry + j).parent().show();
				}
			}
		}
		else if( myData.maxEntries == 0 ) {
			$("#no"+capEntry+'s').show();
		}
	} else {
		if( (myData.maxEntries > 0)&&(loginData[potentialPerson].filtered == 'yes')) {
			for( j=0 ; j<3 ; j++ ) {
				var person = potentialPerson;
				var r = entry+j
				document.getElementById(r).innerHTML = myData[entries][person][r];
				document.getElementById(entryOwner+j).innerHTML = person.charAt(0).toUpperCase();
				if( typeof myData[entries][person][r] !== 'undefined' ) {
					$('#'+r).parent().show();
				}
			}
		} else if( myData.maxEntries == 0 ) {
			$('#'+capEntry+'s').show();
		}
	}
}

function updateClock() {
    var now = new Date(), // current date
    	days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        months = ['January', 'February', 'March', 'April', 'May', 'June',
        		  'July', 'August', 'September', 'October', 'Novebmer', 'December'], // you get the idea
        hours = now.getHours() > 12 ? (now.getHours()-12) : now.getHours(),
        minutes = now.getMinutes() > 10 ? now.getMinutes() : ('0' + now.getMinutes());
        time = hours + ':' + minutes, // again, you get the idea
        ampm = now.getHours() >= 12 ? "PM" : "AM",
        fulltime = [time, ampm].join(' '),

        // a cleaner way than string concatenation
        date = months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();

        dotw = days[now.getDay()];

    // set the content of the element with the ID time to the formatted string
    document.getElementById('datetime').innerHTML = "<h3 class='text-white text-center' style='margin: 5% 0% 2% 0%'>" + [dotw, date, fulltime].join(' - ') + "</h3>";

    // call this function again in 1000ms
    setTimeout(updateClock, 1000);
}

function getCurrentDate() {
	var date = new Date(),
		month, day;
	if( date.getMonth() < 10 ) {
		month = '0' + (date.getMonth()+1);
	} else {
		month = (date.getMonth()+1);
	}

	if( date.getDate() < 10 ) {
		day = '0' + date.getDate();
	} else {
		day = date.getDate();
	}
	return date.getFullYear()+''+month+''+day;
}

function curveCorners() {
	var c = document.getElementsByClassName('incompleteTask');
	var mult, blockComplete, sum,
		foundFirstRow, nonvisibles, potentialLoner;
	console.log(c);
	for( var i=0 ; i<3 ; i++ ) {
		mult = i*3;
		blockComplete = false;
		foundFirstRow = false;
		nonvisibles = 0;
		if( c[mult+2].style.display != 'none' ) {
			c[mult+2].children[0].className += ' lowerLeft';
			c[mult+2].children[1].className += ' lowerRight';
		} else if( c[mult+1].style.display != 'none' ) {
			c[mult+1].children[0].className += ' lowerLeft';
			c[mult+1].children[1].className += ' lowerRight';
		}
		for( var j=0 ; j<3 ; j++ ) {
			sum = mult + j;
			console.log(c[sum].children[1]);
			if( (c[sum].style.display != 'none')&&(foundFirstRow==false) ) {
				c[sum].children[0].className += ' upperLeft';
				c[sum].children[1].className += ' upperRight';
				potentialLoner = c[sum];
				foundFirstRow = true;
			}
			if( (c[sum].style.display == 'none') ) {
				nonvisibles++;
			}
			if( (nonvisibles == 2)&&(foundFirstRow==true) ) {
				potentialLoner.children[0].className = 'lonelyBlockLeft';
				potentialLoner.children[1].className = 'lonelyBlockRight';
			}
		}
	}
}