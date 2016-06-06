/* RESET LOCAL STORAGE: {"reminders":{"numberOfEntries":0,"reminder":[]}} */

/* 	USAGE:

	addSomething("name of page","name of division being inserted")*/
function addSomething(something, divisionName) {
	var myData = JSON.parse(localStorage.getItem('remindersStorage'));
	var promptMessage = "Please enter your " + something;
    var finalSubmit = prompt(promptMessage, "");
    var slotcontainer, slot;
    
    if (finalSubmit != null) {
    	for( var i=0 ; i<5 ; i++ ) {
    		if( document.getElementById("slot" + i).innerHTML === "" ) {
    			slot = document.getElementById("slot" + i);
				slot.innerHTML = finalSubmit;
				slotcontainer = "#slotcontainer" + i;
				$(slotcontainer).show();
				break;
    		}
    	}

    	var element = {};
    	element.descriptionText = finalSubmit;
    	if( typeof myData.reminders === "undefined" ) {
    		element.numberOfEntries = 1;
    	}
    	else {
    		myData.reminders.numberOfEntries++;
    	}
    	myData.reminders.reminder.push(element);
    	localStorage.setItem('remindersStorage', JSON.stringify(myData));

        // document.getElementById(divisionName).appendChild(div);
    }
}

function removeSomething(something, divisionName) {
	var myData = JSON.parse(localStorage.getItem('remindersStorage'));
	var selectedDiv;
	$("#selectDivToRemove").show();
	$('.reminder').bind('click', function(){
		selectedDiv = parseInt(this.id.slice(-1));
		if( myData.reminders.numberOfEntries > 4 ) {
			$("#slotcontainer4").hide();
			console.log("Hiding slotcontainer4");
		}
		else {
			var divToHide = (myData.reminders.numberOfEntries-1);
			$('#slotcontainer' + divToHide).hide();
			document.getElementById("slot" + divToHide).innerHTML = "";
			console.log("Hiding " + divToHide);
		}
		myData.reminders.reminder.splice(selectedDiv, 1);
		console.log("Spliced #slotcontainer" + selectedDiv)
		if( myData.reminders.numberOfEntries > 1 ) {
			for( var i=selectedDiv ; i<(myData.reminders.numberOfEntries-selectedDiv) ; i++ ) {
				if( (selectedDiv == 0)&&(i==myData.reminders.numberOfEntries-1) ) {
					break;
				}
				console.log(myData.reminders.reminder[i].descriptionText)
				document.getElementById("slot" + i).innerHTML = myData.reminders.reminder[i].descriptionText;
			}
		}
		myData.reminders.numberOfEntries--;
		console.log("Number of entries: " + myData.reminders.numberOfEntries)
		$('.reminder').unbind('click');
		$("#selectDivToRemove").hide();
		localStorage.setItem('remindersStorage', JSON.stringify(myData));
	})
}

function load() {
	var myData = JSON.parse(localStorage.getItem('remindersStorage'));
	$("#selectDivToRemove").hide();
	for( var j=0 ; j<5 ; j++ ) {
		$("#slotcontainer" + j).hide();
	}
	if( myData.reminders.numberOfEntries > 0 ) {
		for( var i=0 ; i<myData.reminders.numberOfEntries ; i++ ) {
			document.getElementById("slot" + i).innerHTML = myData.reminders.reminder[i].descriptionText;
			$("#slotcontainer" + i).show();
		}
	}
	localStorage.setItem('remindersStorage', JSON.stringify(myData));
}