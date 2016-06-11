// RESET LOCAL STORAGE: {"locations":{"patty":{"numberOfEntries":0},"gus":{"numberOfEntries":0},"chris":{"numberOfEntries":0}},"maxEntries":0}
// EXAMPLE LOCAL STORAGE: {"locations":{"patty":{"numberOfEntries":5,"location0":"Home","location1":"Main Campus","location2":"Centennial Campus","location3":"Parent's House","location4":"Stefan's House"},"gus":{"numberOfEntries":4,"location0":"Home","location1":"Main Campus","location2":"Centennial Campus","location3":"Addie's House"},"chris":{"numberOfEntries":1,"location0":"Work"}},"maxEntries":5}

function addLocation() {
	var myData = JSON.parse(localStorage.getItem('locationsStorage'));
    $('#selectDivToRemove').show();

	var promptMessage = "Please enter a location";
    var locationSubmit = prompt(promptMessage, "");
    var promptMessage2 = "Please enter a letter";
    var letterSubmit = prompt(promptMessage2, "");
    var person = letterToPerson(letterSubmit);
    var tc = document.getElementById("wuaTable");
    var people = ["patty", "gus", "chris"];
    var tabularData, tabularDataChild;

    if (person != 0) {
        var personPlace = people.indexOf(person);

        var string = "location" + myData.locations[person].numberOfEntries;
        
    	if( myData.maxEntries === myData.locations[person].numberOfEntries ) {
            console.log("Number of entries is equal to max entries");
            $('#wuaTable tbody:last').append("<tr><td class='patty'></td><td class='gus'></td><td class='chris'></td></tr>");
            myData.maxEntries++;
        } else {
            console.log("Number of entries is unequal to max entries")
        }

        tabularData = tc.getElementsByTagName('tbody')[0];
        tabularDataChild = tabularData.children[myData.locations[person].numberOfEntries+1];
        tabularDataChild.children[personPlace].innerHTML = locationSubmit;
        myData.locations[person].numberOfEntries++;
        myData.locations[person][string] = locationSubmit;
        localStorage.setItem('locationsStorage', JSON.stringify(myData));
    }
    $('#selectDivToRemove').hide();
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

function loadWUAPage() {
    var myData = JSON.parse(localStorage.getItem('locationsStorage'));
    var people = ["patty", "gus", "chris"];
    var tc = document.getElementById("wuaTable");
    var tabularData;

    $("#selectDivToRemove").hide();
    
    for( var h=0 ; h<myData.maxEntries ; h++ ) {
        $('#wuaTable tbody:last').append("<tr><td class='patty'></td><td class='gus'></td><td class='chris'></td></tr>");
    }

    for( var i=0 ; i<3 ; i++ ) {
        var person = people[i];
        for( var j=0 ; j<myData.locations[person].numberOfEntries ; j++ ) {
            tabularData = tc.getElementsByTagName('tr')[j+1].children[i];
            if( typeof tabularData !== "undefined" ) {
                tabularData.innerHTML = myData.locations[person]["location"+j];
            }
        }
    }
    updateMaxEntries(myData, people);
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