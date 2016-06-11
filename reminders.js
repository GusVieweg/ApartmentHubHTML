/* RESET LOCAL STORAGE: {"reminders":{"patty":{"numberOfEntries":0},"gus":{"numberOfEntries":0},"chris":{"numberOfEntries":0}},"maxEntries":0} */

/* 	USAGE:
	addSomething("name of page","name of division being inserted")*/

function addReminder() {
	var myData = JSON.parse(localStorage.getItem('remindersStorage'));

	var promptMessage = "Please enter your reminder";
    var reminderSubmit = prompt(promptMessage, "");
    var promptMessage2 = "Please enter a letter";
    var letterSubmit = prompt(promptMessage2, "");
    var tc = document.getElementById("reminderPods");
    var people = ["patty", "gus", "chris"];
    var person = letterToPerson(letterSubmit);
    var tabularData, tabularDataChild;

    if (reminderSubmit != "") {
        var personPlace = people.indexOf(person);

        var string = "reminder" + myData.reminders[person].numberOfEntries;
        
    	if( myData.maxEntries === myData.reminders[person].numberOfEntries ) {
            console.log("Number of entries is equal to max entries");
            myData.maxEntries++;
        } else {
            console.log("Number of entries is unequal to max entries")
        }

        $('#reminderPods').append("<div class='reminder vcenter "+person+"'><h3>" + reminderSubmit + "</h3></div>");

        myData.reminders[person].numberOfEntries++;
        myData.reminders[person][string] = reminderSubmit;
        localStorage.setItem('remindersStorage', JSON.stringify(myData));
    }
    $('#selectDivToRemove').hide();
}

function removeReminder() {
    var myData = JSON.parse(localStorage.getItem('remindersStorage'));
    var elements = document.getElementsByClassName('reminder'),
        toRemoveNum, person, personPlace, varName,
        people = ['patty', 'gus', 'chris'];

    $("#selectDivToRemove").show();

    for( var i=0, len=elements.length ; i<len ; i++ ) {
        elements[i].onclick = function(){
            // Get basic info
            var classes=$(this).attr("class").split(" "),
    			person=classes[classes.length-1];
            personPlace = people.indexOf(person);

            // Get rid of locations on the screen
            switchColumn($(this));
            
            // Get rid of locations in the JSON
            toRemoveNum = ($(this).index());
            switchJSON(myData, person, toRemoveNum);

            // Update max entries count
            updateMaxEntries(myData, people);

            // Clean up
            for( var j=0 ; j<len ; j++ ) {
                elements[j].onclick = null;
            }
            deleteExcessiveRow(myData, elements);
            $('#selectDivToRemove').hide();
        }
    }
}

function loadRemindersPage() {
	var myData = JSON.parse(localStorage.getItem('remindersStorage'));
    var people = ["patty", "gus", "chris"];

    $("#selectDivToRemove").hide();

    for( var i=0 ; i<3 ; i++ ) {
        var person = people[i];
        for( var j=0 ; j<myData.reminders[person].numberOfEntries ; j++ ) {
        	var reminderString = "reminder" + j;
            $('#reminderPods').append("<div class='reminder vcenter "+person+"'><h3>"+myData.reminders[person][reminderString]+"</h3></div>");
        }
    }
    updateMaxEntries(myData, people);
}

function letterToPerson(letter) {
    var person;
    switch( letter ) {
        case 'p': person = "patty"; break;
        case "g": person = "gus";  break;
        case "c": person = "chris"; break;
        default: alert("Person unrecognized"); person = 0;
    }
    return person;
}

function switchJSON(myData, person, startingNum) {
    toRemove = "reminder" + startingNum;
    console.log(myData.reminders[person], person);
    for( var j=startingNum ; j<myData.reminders[person].numberOfEntries ; j++ ) {
        var toReplace = "reminder" + j,
            replaceWith = "reminder" + (j+1),
            replaceString = myData.reminders[person][replaceWith];
        if( j != (myData.reminders[person].numberOfEntries-1) ) {
            console.log("Replacing " + myData.reminders[person][toReplace] + " with " + myData.reminders[person][replaceWith]);
            myData.reminders[person][toReplace] = replaceString;
        } else {
            console.log("Deleting JSON");
            myData.reminders[person].numberOfEntries--;
            delete myData.reminders[person][toReplace];
        }
    }
    localStorage.setItem('remindersStorage', JSON.stringify(myData));
} 

function switchColumn(selected) {
    var next = selected.next();
    if( typeof next[0] !== "undefined" ) {
        var nextText = next[0].children[0].innerHTML,
            thisTextContainer = selected[0].children[0];
        thisTextContainer.innerHTML = nextText;
        switchColumn(next);
    } else {
        selected[0].children[0].innerHTML = "";
    }
}

function updateMaxEntries(myData, people) {
    var winner = 0;
    for( var i=0 ; i<people.length ; i++ ) {
        var person = people[i];
        if( myData.reminders[person].numberOfEntries > winner ) {
            winner = myData.reminders[person].numberOfEntries;
        }
    }
    myData.maxEntries = winner;
    localStorage.setItem('remindersStorage', JSON.stringify(myData));
}

function deleteExcessiveRow(myData, elements) {
    var rowCount = elements.length;
    if( myData.maxEntries !== rowCount ) {
        $('#reminderPods div:last').remove();
    }
}