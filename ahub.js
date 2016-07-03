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

function loadChores() {
	var myData = JSON.parse(localStorage.getItem('choresStorage')),
		loginData = JSON.parse(localStorage.getItem('loginInfo')),
		potentialPerson = whoIsLoggedIn(),
		filtered = false,
		people = ['patty','gus','chris'],
		unfinishedChores = 0;
	for( var j=0 ; j<3 ; j++ ) {
		$('#chore'+j).parent().hide();
	}
	$('#noChores').hide();
	if( (potentialPerson == 0 )||(loginData[potentialPerson].filtered == 'no') ) {
		// console.log('Entered first if')
		if( myData.chores.length > 0 ) {
			for( j=0 ; j<myData.chores.length ; j++ ) {
				if( myData.chores[j].completed == 'no' ) {
					// console.log('Chore incomplete:');
					// console.log(myData.chores[j]);
					document.getElementById('chore'+unfinishedChores).innerHTML = myData.chores[j].task;
					document.getElementById('choreOwner'+unfinishedChores).innerHTML = capitalizeFirstLetter(myData.chores[j].assignedTo);
					$('#chore'+unfinishedChores).parent().show();
					unfinishedChores++;
					if( unfinishedChores == 3 ) {
						break;
					}
				}
			}
			if( unfinishedChores == 0 ) {
				$('#noChores').show();
			}
		}
	} else {
		// console.log('Entered second if');
		if( (myData.chores.length > 0)&&(loginData[potentialPerson].filtered == 'yes')) {
			for( j=0 ; j<myData.chores.length ; j++ ) {
				var person = potentialPerson;
				var r = 'chore'+unfinishedChores;
				if( (myData.chores[j].assignedTo == person)&&(myData.chores[j].completed == 'no')) {
					// console.log(myData.chores[j]);
					document.getElementById(r).innerHTML = myData.chores[j].task;
					document.getElementById('choreOwner'+unfinishedChores).innerHTML = capitalizeFirstLetter(person);
					unfinishedChores++;
					if( typeof myData[entries][person][r] !== 'undefined' ) {
						$('#'+r).parent().show();
					}
				} else if( unfinishedChores == 0 ) {
					$('#noChores').show();
				}
			}
		}
	}
}

function loadGuestbook() {
	var myData = JSON.parse(localStorage.getItem('guestbookStorage')),
		unfinishedChores = 0,
		owner, 
		message;
	for( var j=0 ; j<3 ; j++ ) {

		$('#guestbook'+j).parent().hide();
	}
	$('#noGuestbook').hide();
	for( var i=0 ; i<3 ; i++ ) {
		owner = 'guestbookOwner'+i;
		ownerMessage = 'guestbook'+i;
		if( typeof myData.guestbook[myData.guestbook.length-1-i] !== 'undefined' ) {
			console.log('Showing entry ' + i );
			document.getElementById(owner).innerHTML = myData.guestbook[myData.guestbook.length-1-i].visitor;
			document.getElementById(ownerMessage).innerHTML = myData.guestbook[myData.guestbook.length-1-i].message;
			$('#'+ownerMessage).parent().show();
		}
	}
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
				document.getElementById(entryOwner+j).innerHTML = capitalizeFirstLetter(person);
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
				document.getElementById(entryOwner+j).innerHTML = capitalizeFirstLetter(person);
				if( typeof myData[entries][person][r] !== 'undefined' ) {
					$('#'+r).parent().show();
				}
			}
			if( myData[entries][person].numberOfEntries == 0 ) {
				$('#no'+capEntry+'s').show();
			}
		}
	}
}

function updateClock() {
    var now = new Date(), // current date
    	days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        months = ['January', 'February', 'March', 'April', 'May', 'June',
        		  'July', 'August', 'September', 'October', 'November', 'December'], // you get the idea
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

function updateChoreTimes() {
	console.log('updateChoreTimes called');
	var myData = JSON.parse(localStorage.getItem('choresStorage')),
		choreInterval, choreSecs, lastDone, endMark, hasBeenCompleted,
		people = ['patty','gus','chris'],
		d = new Date(),
        seconds = d.getTime() / 1000;

    console.log(myData);

	for( var i=0 ; i<myData.chores.length ; i++ ) {
		randomRoomie = people[Math.floor(Math.random() * people.length)];
		choreInterval = myData.chores[i].frequency;
		console.log(choreInterval);
		choreSecs = wordsToSeconds(choreInterval);
		lastDone = myData.chores[i].lastDone;
		endMark = lastDone + choreSecs;
		hasBeenCompleted = myData.chores[i].completed;
		if( seconds >= endMark ) {
			console.log('Seconds is greater than end mark');
			if( hasBeenCompleted == 'yes' ) {
				console.log('Has been completed, updating task');
				myData.chores[i].completed = 'no';
				myData.chores[i].assignedTo = randomRoomie;
				myData.chores[i].lastDone = seconds;
			} else {
				myData.chores[i].lastDone = seconds;
			}
		}
	}
	localStorage.setItem('choresStorage', JSON.stringify(myData));
	setTimeout(updateChoreTimes, 60000);
}

function wordsToSeconds(words) {
	var count;
	switch( words ) {
		case 'Minutely': console.log('Called minutely'); count = 60; break;
		case 'Daily': count = 86400; break;
		case 'Twice a week': count = 302400; break;
		case 'Weekly': count = 604800; break;
		case 'Biweekly': count = 1209600; break;
		case 'Monthly': count = 2592000; break;
		case 'Bimonthly': count = 5184000; break;
		default: console.log('default minute case'); count = 60;
	}
	return count;
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
	// console.log(c);
	for( var i=0 ; i<4 ; i++ ) {
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
			// console.log(c[sum].children[1]);
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

function bootup() {
	var myData = JSON.parse(localStorage.getItem('loginInfo'));
	var loggedin, j=0, k=0,
		people = ['patty', 'gus', 'chris'];
	var dateString = "dates=" + getCurrentDate() + "/" + getCurrentDate() + "&amp;",
		iframeString = '<iframe id="gCal" src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=DAY&amp;'+dateString+'height=600&amp;wkst=1&amp;bgcolor=%23EEEEEE&amp;src=ncsu.edu_dgt0if41b0j1vok4j4bqiuu46g%40group.calendar.google.com&amp;color=%236B3304&amp;src=ncsu.edu_oft0hmrtl6g9bkrap93ed7fn1c%40group.calendar.google.com&amp;color=%23B1440E&amp;src=ncsu.edu_ld9pqjofrinf8olrr40138qglo%40group.calendar.google.com&amp;color=%233F658C&amp;ctz=America%2FNew_York" style="border-width:0;margin:0% 5%;border-radius:10px;" width="90%" height="80%;" frameborder="0" scrolling="no"></iframe>'    
    $('#enterYourPassword').hide();
    $('#createYourPassword').hide();
    $('#loginBlock').hide();
    $('#loginText').hide(); $('#logoutText').hide();
    $('#filterOnText').hide(); $('#filterOffText').hide();
    for( var i=0 ; i<3 ; i++ ) {
    	var person = people[i];
    	j++; k++;
    	if( myData[person].loggedin == 'yes' ) {
    		document.getElementById('logoutTextBold').innerHTML = "Logged in as " + capitalizeFirstLetter(person) + " - Click to logout";
    		$('#logoutText').show();
    		j--;
    	} else if( j == 3 ){
    		$('#loginText').show();
    	}
    	if( myData[person].filtered == 'yes' ) {
    		document.getElementById('filterOn').innerHTML = 'Filtered - Click me to defilter';
    		$('#filterOnText').show();
    		switch( person ) {
    			case 'gus':
    				iframeString = '<iframe id="gCal" src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=DAY&amp;'+dateString+'height=600&amp;wkst=1&amp;bgcolor=%23EEEEEE&amp;src=ncsu.edu_oft0hmrtl6g9bkrap93ed7fn1c%40group.calendar.google.com&amp;color=%23B1440E&amp;ctz=America%2FNew_York" style="border-width:0;margin:0% 5%;border-radius:10px;" width="90%" height="80%;" frameborder="0" scrolling="no"></iframe>';
    				break;
    			case 'patty':
    				iframeString = '<iframe id="gCal" src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=DAY&amp;'+dateString+'height=600&amp;wkst=1&amp;bgcolor=%23EEEEEE&amp;src=ncsu.edu_ld9pqjofrinf8olrr40138qglo%40group.calendar.google.com&amp;color=%233F658C&amp;ctz=America%2FNew_York" style="border-width:0;margin:0% 5%;border-radius:10px;" width="90%" height="80%;" frameborder="0" scrolling="no"></iframe>';
    				break;
    			case 'chris':
    				iframeString = '<iframe id="gCal" src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=DAY&amp;'+dateString+'height=600&amp;wkst=1&amp;bgcolor=%23EEEEEE&amp;src=ncsu.edu_dgt0if41b0j1vok4j4bqiuu46g%40group.calendar.google.com&amp;color=%236B3304&amp;ctz=America%2FNew_York" style="border-width:0;margin:0% 5%;border-radius:10px;" width="90%" height="80%;" frameborder="0" scrolling="no"></iframe>';
    				break;
    			default:
    				iframeString = '<iframe id="gCal" src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=DAY&amp;'+dateString+'height=600&amp;wkst=1&amp;bgcolor=%23EEEEEE&amp;src=ncsu.edu_dgt0if41b0j1vok4j4bqiuu46g%40group.calendar.google.com&amp;color=%236B3304&amp;src=ncsu.edu_oft0hmrtl6g9bkrap93ed7fn1c%40group.calendar.google.com&amp;color=%23B1440E&amp;src=ncsu.edu_ld9pqjofrinf8olrr40138qglo%40group.calendar.google.com&amp;color=%233F658C&amp;ctz=America%2FNew_York" style="border-width:0;margin:0% 5%;border-radius:10px;" width="90%" height="80%;" frameborder="0" scrolling="no"></iframe>';
    			}
    		k--;
    	} else if( k == 3 ) {
    		$('#filterOffText').show();
    	}
    }
    $('#dayCalendarPanel').append(iframeString);
}