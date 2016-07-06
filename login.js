// login.js
// backup: {"patty":{"password":"bigpatty","loggedin":"no","filtered":"no"},"gus":{"password":"default_password","loggedin":"no","filtered":"no"},"chris":{"password":"default_password","loggedin":"no","filtered":"no"}}

function showLogin() {
    $('#loginBlock').show();
}

function logout() {
    var myData = JSON.parse(localStorage.getItem('loginInfo'));
    var people = ['patty', 'gus', 'chris'];
    for( var i=0 ; i<3 ; i++ ) {
        var person = people[i];
        myData[person].loggedin = 'no';
        myData[person].filtered = 'no';
    }
    $('#logoutText').hide();
    $('#loginText').show();
    localStorage.setItem('loginInfo', JSON.stringify(myData));
    window.location.reload();
}

function retrievePerson() {
    var ebcn = document.getElementsByClassName('loginOption'),
        result = 0;
    for( var i=0 ; i<(ebcn.length) ; i++ ) {
        if( ebcn[i].style.backgroundColor === 'black' ) {
            result = ebcn[i].innerHTML.toLowerCase();
            console.log("Retrieving person: " + result);
            break;
        }
    }
    return result;
}

function checkForNull(x) {
    if (x == null || x == "") { 
        alert("Password must be filled out");
        return 0;
    } else {
        return 1;
    }
}

function selectPerson(person) {
    var personSelected = false;
    if( retrievePerson() == 0 ) {
        var myData = JSON.parse(localStorage.getItem('loginInfo'));
        $('#'+person+'Login').css('background-color', 'black');
        if( myData[person].password === "default_password" ) {
            console.log(myData[person].password);
            $('#createYourPassword').show();
            myData[person].password = 'creating_password';
        } else {
            console.log('entering password');
            $('#enterYourPassword').show();
        }
        localStorage.setItem('loginInfo', JSON.stringify(myData));
    }
}

function validateForm(action) {
    var myData = JSON.parse(localStorage.getItem('loginInfo'));
    var person = retrievePerson();
    var formResult;
    if( action == 'create' ) {
        console.log("Creating password....");
        formResult = document.forms["createForm"]["password"].value;
        if( checkForNull(formResult) === 0 ) { return false; }
        myData[person].password = formResult;
        myData[person].loggedin = 'yes';
        $('#createYourPassword').hide();
        $('#loginBlock').hide();
    } else if( action == 'enter' ) {
        console.log("Entering password....");
        formResult = document.forms["enterForm"]["password"].value;
        if( checkForNull(formResult) === 0 ) { console.log("Is null!"); return false; }
        else if( myData[person].password == formResult ) {
            console.log('password entered!');
            myData[person].loggedin = 'yes';
        } else {
            console.log("Incorrect password");
            alert("Incorrect password, please try again.")
        }
        $('#enterYourPassword').hide();
        $('#loginBlock').hide();
    } else {
        alert("An error occurred, please try again.");
    }
    localStorage.setItem('loginInfo', JSON.stringify(myData));
}

function capitalizeFirstLetter(string) {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}