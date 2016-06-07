// RESET LOCAL STORAGE: {"locations":{"numberOfEntries":0,"reminder":[]}}
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
    var element = {};
    var tabularData, tabularDataChild;

    if (person != 0) {
        var personPlace = people.indexOf(person);

        var string = "location" + myData.locations[person].numberOfEntries;
        
    	if( myData.maxEntries === myData.locations[person].numberOfEntries ) {
            console.log("Number of entries is equal to max entries");
            $('#wuaTable tbody:last').append("<tr><td class='tableBorder'></td><td class='tableBorder'></td><td></td></tr>");
            tabularData = tc.getElementsByTagName('tbody')[0];
            tabularDataChild = tabularData.children[myData.locations[person].numberOfEntries+1];
            tabularDataChild.children[personPlace].innerHTML = locationSubmit;
            myData.maxEntries++;
        } else {
            console.log("Number of entries is unequal to max entries")
            tabularData = tc.getElementsByTagName('tbody')[0];
            tabularDataChild = tabularData.children[myData.locations[person].numberOfEntries+1];
            tabularDataChild.children[personPlace].innerHTML = locationSubmit;
        }

        myData.locations[person].numberOfEntries++;
        myData.locations[person][string] = locationSubmit;
        localStorage.setItem('locationsStorage', JSON.stringify(myData));
    }
    $('#selectDivToRemove').hide();
}

function removeLocation() {
    var myData = JSON.parse(localStorage.getItem('achievementsStorage'));
    var selectedElement;
    var tc = document.getElementById("wuaTable");
    var elements = tc.getElementsByTagName('td');
    $("#selectDivToRemove").show();
    
    for( var i=0, len=elements.length ; i<len ; i++ ) {
        elements[i].onclick = function(){
            console.log(this);
            // selectedDiv = parseInt(this.id.slice(-1));
            // if( myData.achievements.numberOfEntries > 4 ) {
            //     $("#slotcontainer4").hide();
            //     console.log("Hiding slotcontainer4");
            // }
            // else {
            //     var divToHide = (myData.achievements.numberOfEntries-1);
            //     $('#slotcontainer' + divToHide).hide();
            //     document.getElementById("slot" + divToHide).innerHTML = "";
            //     console.log("Hiding " + divToHide);
            // }
            // myData.achievements.achievement.splice(selectedDiv, 1);
            // console.log("Spliced #slotcontainer" + selectedDiv)
            // if( myData.achievements.numberOfEntries > 1 ) {
            //     for( var i=selectedDiv ; i<(myData.achievements.numberOfEntries-selectedDiv) ; i++ ) {
            //         if( (selectedDiv == 0)&&(i==myData.achievements.numberOfEntries-1) ) {
            //             break;
            //         }
            //         console.log(myData.achievements.achievement[i].descriptionText)
            //         document.getElementById("slot" + i).innerHTML = myData.achievements.achievement[i].descriptionText;
            //     }
            // }
            // myData.achievements.numberOfEntries--;
            // console.log("Number of entries: " + myData.achievements.numberOfEntries)
            // $('.achievement').unbind('click');
            // $("#selectDivToRemove").hide();
            // localStorage.setItem('achievementsStorage', JSON.stringify(myData));
        }
    }
}

function loadWUAPage() {
    var myData = JSON.parse(localStorage.getItem('locationsStorage'));
    var people = ["patty", "gus", "chris"];
    var tc = document.getElementById("wuaTable");
    var tabularData;

    $("#selectDivToRemove").hide();
    
    for( var i=0 ; i<3 ; i++ ) {
        var person = people[i];
        for( var j=0 ; j<myData.locations[person].numberOfEntries ; j++ ) {
            tabularData = tc.getElementsByTagName('tr')[j+1].children[i];
            if( typeof tabularData !== "undefined" ) {
                tabularData.innerHTML = myData.locations[person]["location"+j];
            }
        }
    }
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