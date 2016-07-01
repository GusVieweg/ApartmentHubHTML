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

function removeChore() {
    var myData = JSON.parse(localStorage.getItem('choresStorage'));
    var tc = document.getElementById("choreTable"),
        elements = tc.getElementsByTagName('td'),
        toRemoveNum, person, personPlace,
        people = ['patty', 'gus', 'chris'];

    $("#selectDivToRemove").show();

    for( var i=0, len=elements.length ; i<len ; i++ ) {
        elements[i].onclick = function(){

            // Get rid of locations on the screen
            switchColumn($(this).parent(), personPlace);
            
            // Get rid of locations in the JSON
            toRemoveNum = ($(this).parent().index()-1);
            switchJSON(myData, toRemoveNum);

            // Clean up
            for( var j=0 ; j<len ; j++ ) {
                elements[j].onclick = null;
            }
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
}

function switchColumn(jParent) {
    var next = jParent.next();
    if( typeof next[0] !== "undefined" ) {
    	for( var i=0 ; i<3 ; i++ ) {
	        var nextText = next[0].children[i].innerHTML,
	            thisTextContainer = jParent[0].children[i];
	        thisTextContainer.innerHTML = nextText;
	    }
        switchColumn(next);
    } else {
    	for( var j=0 ; j<3 ; j++ ) {
        	jParent[0].children[j].innerHTML = "";
        }
    }
}

function switchJSON(myData, startingNum) {
    for( var j=startingNum ; j<myData.chores.length ; j++ ) {
        var toReplace = j,
            replaceWith = (j+1),
            replaceString = myData.chores[j+1];
        if( j != (myData.chores.length-1) ) {
            console.log("Replacing " + myData.chores[toReplace] + " with " + myData.chores[replaceWith]);
            myData.chores[toReplace] = replaceString;
        } else {
            console.log("Deleting JSON");
            // using 'delete' here (a la wua.js) would leave 'null' in the JSON
            myData.chores.splice(j,1);
        }
    }
    localStorage.setItem('choresStorage', JSON.stringify(myData));
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