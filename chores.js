// chores.js
// RESET STORAGE: {"chores":[{"task":"Take out the trash","frequency":"twice a week","lastCompletedBy":"gus"},{"task":"Wash dishes","frequency":"daily","lastCompletedBy":"chris"}]}

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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function addChore() {
	var person = whoIsLoggedIn();
	if( person != 0 ) {
		$('#choreCreation').show();
		console.log('showing chore creation');
	} else {
		alert('Please log in to add a new chore.');
	}
}

function returnFrequencySelected() {
	var	listOfChoreOptions = document.getElementsByClassName('choreOption'),
		returnVal = 0,
		locoLength = listOfChoreOptions.length;
	for( var i=0 ; i<locoLength ; i++ ) {
		if( listOfChoreOptions[i].style.backgroundColor == 'black' ) {
			returnVal = listOfChoreOptions[i].innerHTML;
		}
	}
	return returnVal;
}

function submitChore() {
	//myData.chores[i].task/frequency/lastCompletedBy
	var myData = JSON.parse(localStorage.getItem('choresStorage')),
		frequencySelected = returnFrequencySelected(),
		person = whoIsLoggedIn(),
		people = ['patty', 'gus', 'chris'],
		randomRoomie = people[Math.floor(Math.random() * people.length)],
		taskName = document.forms["choreForm"]["choreName"].value,
		newEntrySpot = myData.chores.length

	if( person != 0 ) {
		myData.chores[newEntrySpot] = {
			task: taskName,
			frequency: frequencySelected,
			lastCompletedBy: randomRoomie
		}
		$('#choreTable tbody:last').append('<tr><td class="task"><h4>'+capitalizeFirstLetter(taskName)
        								   +'</h4></td><td class="freq"><h4>'
        								   +capitalizeFirstLetter(frequencySelected)+'</h4></td><td><h4>'
        								   +capitalizeFirstLetter(randomRoomie)+'</h4></td></tr>');
		localStorage.setItem('choresStorage', JSON.stringify(myData));
	}
    $('#choreCreation').hide();
}

function removeLocation() {
    var myData = JSON.parse(localStorage.getItem('locationsStorage'));
    var tc = document.getElementById("wuaTable"),
        elements = tc.getElementsByTagName('td'),
        toRemoveNum, person, personPlace,
        people = ['patty', 'gus', 'chris'];

    $("#selectDivToRemove").show();
    deleteExcessiveRow(myData);

    for( var i=0, len=elements.length ; i<len ; i++ ) {
        elements[i].onclick = function(){
            // Get basic info
            person = this.className;
            personPlace = people.indexOf(person);

            // Get rid of locations on the screen
            switchColumn($(this).parent(), personPlace);
            
            // Get rid of locations in the JSON
            toRemoveNum = ($(this).parent().index()-1);
            switchJSON(myData, person, toRemoveNum);

            // Update max entries count
            updateMaxEntries(myData, people);

            // Clean up
            for( var j=0 ; j<len ; j++ ) {
                elements[j].onclick = null;
            }
            deleteExcessiveRow(myData);
            $('#selectDivToRemove').hide();
        }
    }
}

function loadChorePage() {
    var myData = JSON.parse(localStorage.getItem('choresStorage')),
    	numOfChores = myData.chores.length,
    	people = ["patty", "gus", "chris"],
    	tc = document.getElementById("wuaTable"),
    	tabularData;

    $("#selectDivToRemove").hide();
    
    for( var c=0 ; c<numOfChores ; c++ ) {
        $('#choreTable tbody:last').append('<tr><td class="task"><h4>'+capitalizeFirstLetter(myData.chores[c].task)
        								   +'</h4></td><td class="freq"><h4>'
        								   +capitalizeFirstLetter(myData.chores[c].frequency)+'</h4></td><td><h4>'
        								   +capitalizeFirstLetter(myData.chores[c].lastCompletedBy)+'</h4></td></tr>');
    }

    // for( var i=0 ; i<3 ; i++ ) {
    //     var person = people[i];
    //     for( var j=0 ; j<myData.locations[person].numberOfEntries ; j++ ) {
    //         tabularData = tc.getElementsByTagName('tr')[j+1].children[i];
    //         if( typeof tabularData !== "undefined" ) {
    //             tabularData.innerHTML = myData.locations[person]["location"+j];
    //         }
    //     }
    // }
    // updateMaxEntries(myData, people);
    //localStorage.setItem('locationsStorage', JSON.stringify(myData));
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

function switchColumn(jParent, pp) {
    var next = jParent.next();
    if( typeof next[0] !== "undefined" ) {
        var nextText = next[0].children[pp].innerHTML,
            thisTextContainer = jParent[0].children[pp];
        thisTextContainer.innerHTML = nextText;
        switchColumn(next, pp);
    } else {
        jParent[0].children[pp].innerHTML = "";
    }
}

function switchJSON(myData, person, startingNum) {
    toRemove = "location" + startingNum;
    for( var j=startingNum ; j<myData.locations[person].numberOfEntries ; j++ ) {
        var toReplace = "location" + j,
            replaceWith = "location" + (j+1),
            replaceString = myData.locations[person][replaceWith];
        if( j != (myData.locations[person].numberOfEntries-1) ) {
            console.log("Replacing " + myData.locations[person][toReplace] + " with " + myData.locations[person][replaceWith]);
            myData.locations[person][toReplace] = replaceString;
        } else {
            console.log("Deleting JSON");
            myData.locations[person].numberOfEntries--;
            delete myData.locations[person][toReplace];
        }
    }
    localStorage.setItem('locationsStorage', JSON.stringify(myData));
} 

function updateMaxEntries(myData, people) {
    var winner = 0;
    for( var i=0 ; i<people.length ; i++ ) {
        var person = people[i];
        if( myData.locations[person].numberOfEntries > winner ) {
            winner = myData.locations[person].numberOfEntries;
        }
    }
    myData.maxEntries = winner;
    localStorage.setItem('locationsStorage', JSON.stringify(myData));
}

function deleteExcessiveRow(myData) {
    var rowCount = $('#wuaTable tr').length-1;
    if( myData.maxEntries !== rowCount ) {
        $('#wuaTable tr:last').remove();
    }
}

function selectFrequency(clickedItem) {
	var frequencyJSON = String(clickedItem).charAt(0).toLowerCase() + String(clickedItem).slice(1),
		listOfChoreOptions = document.getElementsByClassName('choreOption'),
		alreadySelected = false,
		locoLength = listOfChoreOptions.length;
	for( var i=0 ; i<locoLength ; i++ ) {
		if( listOfChoreOptions[i].style.backgroundColor == 'black' ) {
			alreadySelected = true;
		}
	}
	if(!alreadySelected) {
		$(clickedItem).css('background-color', 'black');
	}
	console.log(clickedItem.innerHTML);
}