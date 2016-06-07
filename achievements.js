/* RESET LOCAL STORAGE: {"achievements":{"numberOfEntries":0,"achievement":[]}} */

function addAchievement() {
	var myData = JSON.parse(localStorage.getItem('achievementsStorage'));
	var promptMessage = "Please enter your achievement";
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
    	if( typeof myData.achievements === "undefined" ) {
    		element.numberOfEntries = 1;
    	}
    	else {
    		myData.achievements.numberOfEntries++;
    	}
    	myData.achievements.achievement.push(element);
    	localStorage.setItem('achievementsStorage', JSON.stringify(myData));
    }
}

function removeAchievement() {
	var myData = JSON.parse(localStorage.getItem('achievementsStorage'));
	var selectedDiv;
	$("#selectDivToRemove").show();
	$('.achievement').bind('click', function(){
		selectedDiv = parseInt(this.id.slice(-1));
		if( myData.achievements.numberOfEntries > 4 ) {
			$("#slotcontainer4").hide();
			console.log("Hiding slotcontainer4");
		}
		else {
			var divToHide = (myData.achievements.numberOfEntries-1);
			$('#slotcontainer' + divToHide).hide();
			document.getElementById("slot" + divToHide).innerHTML = "";
			console.log("Hiding " + divToHide);
		}
		myData.achievements.achievement.splice(selectedDiv, 1);
		console.log("Spliced #slotcontainer" + selectedDiv)
		if( myData.achievements.numberOfEntries > 1 ) {
			for( var i=selectedDiv ; i<(myData.achievements.numberOfEntries-selectedDiv) ; i++ ) {
				if( (selectedDiv == 0)&&(i==myData.achievements.numberOfEntries-1) ) {
					break;
				}
				console.log(myData.achievements.achievement[i].descriptionText)
				document.getElementById("slot" + i).innerHTML = myData.achievements.achievement[i].descriptionText;
			}
		}
		myData.achievements.numberOfEntries--;
		console.log("Number of entries: " + myData.achievements.numberOfEntries)
		$('.achievement').unbind('click');
		$("#selectDivToRemove").hide();
		localStorage.setItem('achievementsStorage', JSON.stringify(myData));
	})
}

function loadAchievementsPage() {
	var myData = JSON.parse(localStorage.getItem('achievementsStorage'));
	$("#selectDivToRemove").hide();
	for( var j=0 ; j<5 ; j++ ) {
		$("#slotcontainer" + j).hide();
	}
	if( myData.achievements.numberOfEntries > 0 ) {
		for( var i=0 ; i<myData.achievements.numberOfEntries ; i++ ) {
			document.getElementById("slot" + i).innerHTML = myData.achievements.achievement[i].descriptionText;
			$("#slotcontainer" + i).show();
		}
	}
	localStorage.setItem('achievementsStorage', JSON.stringify(myData));
}