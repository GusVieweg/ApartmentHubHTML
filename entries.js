/* RESET LOCAL STORAGE: {"reminders":{"patty":{"numberOfEntries":0},"gus":{"numberOfEntries":0},"chris":{"numberOfEntries":0}},"maxEntries":0} */

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
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}

/* 	USAGE:
	addSomething("name of page","name of division being inserted")*/

function addEntry(entry) {
    var entryStorage = entry + "sStorage",
        entryPods = entry + "Pods",
        entries = entry + "s",
	    myData = JSON.parse(localStorage.getItem(entryStorage)),
        person = whoIsLoggedIn(),
        formalPerson = capitalizeFirstLetter(person);
    
    console.log("Person who is logged in: " + person);

    if( person != 0 ) {
    	var promptMessage = "Please enter your " + entry + ", " + formalPerson + "!";
        var entrySubmit = prompt(promptMessage, "");
        var tc = document.getElementById(entryPods);
        var people = ["patty", "gus", "chris"];
        var tabularData, tabularDataChild;

        if (entrySubmit != "") {
            var personPlace = people.indexOf(person);

            var string = entry + myData[entries][person].numberOfEntries;
            
        	if( myData.maxEntries === myData[entries][person].numberOfEntries ) {
                console.log("Number of entries is equal to max entries");
                myData.maxEntries++;
            } else {
                console.log("Number of entries is unequal to max entries")
            }

            if( entry == 'reminder' ) {
                $('#' + entryPods).append("<div class='"+entry+" vcenter "+person+"'><h3>"+formalPerson+' - '+ entrySubmit + "</h3></div>");
            } else {
                $('#' + entryPods).append("<div class='"+entry+" vcenter "+person+"'><h3>"+formalPerson+' '+ entrySubmit + "!</h3></div>");
            }

            myData[entries][person].numberOfEntries++;
            myData[entries][person][string] = entrySubmit;
            localStorage.setItem(entryStorage, JSON.stringify(myData));
        }
        $('#selectDivToRemove').hide();
    } else {
        alert("Please log in to edit " + entries);
    }
}

function removeEntry(entry) {
    var entryStorage = entry + "sStorage",
        entryPods = '#' + entry + "Pods",
        entries = entry + "s",
        myData = JSON.parse(localStorage.getItem(entryStorage)),
        elements = document.getElementsByClassName(entry),
        toRemoveNum, person, personPlace, varName,
        personLoggedIn = whoIsLoggedIn(),
        people = ['patty', 'gus', 'chris'];

    $("#selectDivToRemove").show();

    if( personLoggedIn != 0 ) {
        for( var i=0, len=elements.length ; i<len ; i++ ) {
            elements[i].onclick = function(){
                // Get basic info
                var classes=$(this).attr("class").split(" "),
        			person=classes[classes.length-1];
                personPlace = people.indexOf(person);

                if( personLoggedIn == person ) {
                    // Get rid of locations on the screen
                    switchColumn($(this));
                    
                    // Get rid of locations in the JSON
                    toRemoveNum = ($(this).index());
                    console.log(toRemoveNum);
                    switchJSON(myData, person, toRemoveNum, entry);

                    // Update max entries count
                    updateMaxEntries(myData, people, entry);

                    // Clean up
                    for( var j=0 ; j<len ; j++ ) {
                        elements[j].onclick = null;
                    }
                    deleteExcessiveRow(myData, people, entry);
                } else {
                    alert('Please login to remove your ' + entries + '.');
                }
                $('#selectDivToRemove').hide();
            }
        }
    } else {
        alert("Please log in to edit " + entries);
    }
}

function loadEntryPage(entry) {
    var entryStorage = entry + "sStorage",
        entryPods = '#' + entry + "Pods",
        entries = entry + "s",
	    myData = JSON.parse(localStorage.getItem(entryStorage)),
        loginData = JSON.parse(localStorage.getItem('loginInfo')),
        people = ["patty", "gus", "chris"],
        personLoggedIn = whoIsLoggedIn(),
        formalPersonLI = capitalizeFirstLetter(personLoggedIn);

    $("#selectDivToRemove").hide();

    if( (personLoggedIn != 0)&&(loginData[personLoggedIn].filtered == 'yes') ) {
        for( var j=0 ; j<myData[entries][personLoggedIn].numberOfEntries ; j++ ) {
            var entryString = entry + j;
            
            if( entry == 'reminder' ) {
                $(entryPods).append("<div class='"+entry+" vcenter "+personLoggedIn+"'><h3>"+formalPersonLI+' - '+ myData[entries][personLoggedIn][entryString] + "</h3></div>");
            } else {
                $(entryPods).append("<div class='"+entry+" vcenter "+personLoggedIn+"'><h3>"+formalPersonLI+' '+ myData[entries][personLoggedIn][entryString] + "!</h3></div>");
            }

        }
    } else {
        for( var i=0 ; i<3 ; i++ ) {
            var person = people[i];
            var formalLayman = capitalizeFirstLetter(person);
            for( var j=0 ; j<myData[entries][person].numberOfEntries ; j++ ) {
                var entryString = entry + j;
                if( entry == 'reminder' ) {
                    $(entryPods).append("<div class='"+entry+" vcenter "+person+"'><h3>"+formalLayman+' - '+ myData[entries][person][entryString] + "</h3></div>");
                } else {
                    $(entryPods).append("<div class='"+entry+" vcenter "+person+"'><h3>"+formalLayman+' '+ myData[entries][person][entryString] + "!</h3></div>");
                }

            }
        }
    }
    updateMaxEntries(myData, people, entry);
}

function switchJSON(myData, person, startingNum, entry) {
    var entryStorage = entry + "sStorage",
        entryPods = '#' + entry + "Pods",
        entries = entry + "s",
        toRemove = entry + startingNum;
        console.log(person);
    for( var j=startingNum ; j<myData[entries][person].numberOfEntries+1 ; j++ ) {
        var toReplace = entry + j,
            replaceWith = entry + (j+1),
            replaceString;
            console.log(myData, replaceWith);
            console.log(myData[entries][person][replaceWith]);
        if( typeof myData[entries][person][replaceWith] !== "undefined" ) {
            replaceString = myData[entries][person][replaceWith];
            console.log("Replacing " + myData[entries][person][toReplace] + " with " + myData[entries][person][replaceWith]);
            myData[entries][person][toReplace] = replaceString;
        } else {
            console.log("Deleting JSON");
            myData[entries][person].numberOfEntries--;
            delete myData[entries][person][toReplace];
        }
    }
    localStorage.setItem(entryStorage, JSON.stringify(myData));
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

function updateMaxEntries(myData, people, entry) {
    var entryStorage = entry + "sStorage",
        entries = entry + "s",
        winner = 0;
    for( var i=0 ; i<people.length ; i++ ) {
        var person = people[i];
        if( myData[entries][person].numberOfEntries > winner ) {
            winner = myData[entries][person].numberOfEntries;
        }
    }
    myData.maxEntries = winner;
    localStorage.setItem(entryStorage, JSON.stringify(myData));
}

function deleteExcessiveRow(myData, people, entry) {
    var entries = entry + 's',
        entryPods = '#' + entry + 'Pods',
        totalCount,
        rowCount = $(entryPods).length;
    for( var i=0 ; i<3 ; i++ ) { 
        person = people[i];
        console.log(myData[entries])
        totalCount += myData[entries][person].numberOfEntries;
    }
    if( totalCount !== rowCount ) {
        console.log("Removing div!");
        $(entryPods + ' div:last').remove();
    }
}