// ahub.js

function loadReminders() {
	console.log("Reminders loaded");
	var myData = JSON.parse(localStorage.getItem('remindersStorage'));
	for( var j=0 ; j<3 ; j++ ) {
		$("#reminder" + j).parent().hide();
	}
	$("#noReminders").hide();
	if( myData.reminders.numberOfEntries > 0 ) {
		for( j=0 ; j<myData.reminders.numberOfEntries ; j++ ) {
			document.getElementById("reminder" + j).innerHTML = myData.reminders.reminder[j].descriptionText;
			console.log(j + ": " + myData.reminders.reminder[j].descriptionText)
			$("#reminder" + j).parent().show();
		}
	}
	else if( myData.maxEntries == 0 ) {
		$("#noReminders").show();
	}
}

function loadAchievements() {
	console.log("Achievements loaded");
	var myData = JSON.parse(localStorage.getItem('achievementsStorage'));
	for( var j=0 ; j<3 ; j++ ) {
		$("#achievement" + j).parent().hide();
	}
	$("#noAchievements").hide();
	if( myData.achievements.numberOfEntries > 0 ) {
		for( j=0 ; j<myData.achievements.numberOfEntries ; j++ ) {
			document.getElementById("achievement" + j).innerHTML = myData.achievements.achievement[j].descriptionText;
			console.log(j + ": " + myData.achievements.achievement[j].descriptionText)
			$("#achievement" + j).parent().show();
		}
	}
	else if( myData.maxEntries == 0 ) {
		$("#noAchievements").show();
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

