// guestbook.js

// chores.js
// RESET STORAGE: {"chores":[{"task":"Take out the trash","frequency":"twice a week","assignedTo":"gus","completed":"yes","lastDone":1467421320},{"task":"Wash dishes","frequency":"daily","assignedTo":"chris","completed":"no","lastDone":1467421320}]}

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

function createLogTime() {
    var now = new Date(), // current date
        months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'], // you get the idea
        hours = now.getHours() > 12 ? (now.getHours()-12) : now.getHours(),
        minutes = now.getMinutes() > 10 ? now.getMinutes() : ('0' + now.getMinutes());
        time = hours + ':' + minutes,
        ampm = now.getHours() >= 12 ? "PM" : "AM",
        fulltime = [time, ampm].join(' '),

        date = months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();

    return [date, fulltime].join(' - ');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function addGuestbook() {
    console.log('sign guestbook called');
    $('#signGuestbook').show();
}

function submitGuestbook() {
    console.log('Entered');
    var myData = JSON.parse(localStorage.getItem('guestbookStorage')),
        _visitor = document.forms["guestbookForm"]["guestbookName"].value,
        logTime = createLogTime();
        _message = document.forms['guestbookForm']['guestbookMessage'].value,
        newEntrySpot = myData.guestbook.length;

    myData.guestbook[newEntrySpot] = {
        visitor: _visitor,
        when: logTime,
        message: _message,
    }
    $('#guestbookTable tbody:last').append('<tr><td class="visitorTD"><h4>'+capitalizeFirstLetter(_visitor)
                                       +'</h4></td><td class="whenTD"><h4>'
                                       +logTime+'</h4></td><td class="messageTD"><h4>'
                                       +_message+'</h4></td></tr>');
    localStorage.setItem('guestbookStorage', JSON.stringify(myData));
    $('#signGuestbook').hide();
}

function removeGuestbook() {
    var myData = JSON.parse(localStorage.getItem('guestbookStorage'));
    var tc = document.getElementById("guestbookTable"),
        elements = tc.getElementsByTagName('td'),
        toRemoveNum,
        person = whoIsLoggedIn();

    if( person != 0 ) {
        $("#selectDivToRemove").show();

        for( var i=0, len=elements.length ; i<len ; i++ ) {
            elements[i].onclick = function(){

                // Get rid of locations on the screen
                switchColumn($(this).parent());
                
                // Get rid of locations in the JSON
                toRemoveNum = ($(this).parent().index()-1);
                switchJSON(myData, toRemoveNum);

                // Clean up
                for( var j=0 ; j<len ; j++ ) {
                    elements[j].onclick = null;
                }
                deleteExcessiveRow(myData);
                $('#selectDivToRemove').hide();
            }
        }
    } else {
        alert('Please log in to remove a guestbook entry.');
    }
}

function loadGuestbookPage() {
    var myData = JSON.parse(localStorage.getItem('guestbookStorage')),
        guestbookEntries = myData.guestbook.length,
        people = ["patty", "gus", "chris"];

    $("#selectDivToRemove").hide();
    
    for( var g=0 ; g<guestbookEntries ; g++ ) {
        $('#guestbookTable tbody:last').append('<tr><td class="visitorTD"><h4>'+capitalizeFirstLetter(myData.guestbook[g].visitor)
                                           +'</h4></td><td class="whenTD"><h4>'
                                           +myData.guestbook[g].when+'</h4></td><td class="messageTD"><h4>'
                                           +myData.guestbook[g].message+'</h4></td></tr>');
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
    for( var j=startingNum ; j<myData.guestbook.length ; j++ ) {
        var toReplace = j,
            replaceWith = (j+1),
            replaceString = myData.guestbook[j+1];
        if( j != (myData.guestbook.length-1) ) {
            // console.log("Replacing " + myData.chores[toReplace] + " with " + myData.chores[replaceWith]);
            myData.guestbook[toReplace] = replaceString;
        } else {
            // console.log("Deleting JSON");
            // using 'delete' here (a la wua.js) would leave 'null' in the JSON
            myData.guestbook.splice(j,1);
        }
    }
    localStorage.setItem('guestbookStorage', JSON.stringify(myData));
} 

function deleteExcessiveRow(myData) {
    var rowCount = $('#guestbookTable tr').length-1;
    if( myData.maxEntries !== rowCount ) {
        $('#choreTable tr:last').remove();
    }
}

