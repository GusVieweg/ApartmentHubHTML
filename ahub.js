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
	else if( myData.reminders.numberOfEntries == 0 ) {
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
	else if( myData.achievements.numberOfEntries == 0 ) {
		$("#noAchievements").show();
	}
}

function updateClock() {
    var now = new Date(), // current date
    	days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        months = ['January', 'February', 'March', 'April', 'May', 'June',
        		  'July', 'August', 'September', 'October', 'Novebmer', 'December'], // you get the idea
        hours = now.getHours() >= 12 ? (now.getHours()-12) : now.getHours(),
        time = hours + ':' + now.getMinutes(), // again, you get the idea
        ampm = now.getHours() >= 12 ? "PM" : "AM",
        fulltime = [time, ampm].join(' '),

        // a cleaner way than string concatenation
        date = [months[now.getMonth()],
       			now.getDate(),
                now.getFullYear()].join(' ');

        dotw = days[now.getDay()];

    // set the content of the element with the ID time to the formatted string
    document.getElementById('datetime').innerHTML = "<h1 class='text-white text-center'>" + [dotw, date, fulltime].join(' - ') + "</h1>";

    // call this function again in 1000ms
    setTimeout(updateClock, 1000);
}