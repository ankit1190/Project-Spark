const key = "?api_key=RGAPI-56abecb0-497b-4769-b4ec-b08b1e292e00"; // key that needs to be updated everyday
const url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"; //url to get the encrypted summoner string id, name, lvl.
const url2 = "https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/";
// url2 is to get champions detail for that summoner.
const url3 = "https://na1.api.riotgames.com/lol/platform/v3/champion-rotations"


const summInfoContainer = document.getElementById('summ-info');
const summonButton = document.getElementById('summ-button');

getFreeChamps();


// I have create a function that will use the entered text and plug that into the url to get the request.

summonButton.addEventListener('click', getSumInfo); // eventlistener that makes the AJAX call when the 'Go' button is clicked.

function getSumInfo() {
    console.log('getSumInfo()');

    let summInput = document.getElementById('summ-name').value;


    if (summInput) {
        fetch(url + summInput + key).then(response => {
            return response.json();
        }).then(data => {

            console.log(data);
            displaySummInfo(data);
            getRecentChampsPlayedInfo(data);

        }).catch(err => {
            console.log(err);
        })
    }
}


//now I will try to take the information from getSumInfo() and use the encrypted string to get champions played information.
function getRecentChampsPlayedInfo(data) {
    console.log('inside getRecentChampsPlayedInfo()');

    let summID = data.id; //takes in the data from first call, takes the summoner ID string to input into below URL.
    fetch(url2 + summID + key).then(response => {
        return response.json();
    }).then(data2 => {
        console.log(data2);
        getChampInfo(data2);
    })
}



//making function to take in the champion ID and extracting appropriate name and other info as wanted.

function getChampInfo(data2) {
    console.log('getChampInfo()');

    fetch('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json').then(response => {
        return response.json();
    }).then(data3 => {
        console.log(data3);
        displayChampInfo(data2, data3);
    })
}

// taking info from getSumInfo() and using the data object into another function to extract desired information and extracting it.

function getFreeChamps(){
    fetch(url3 + key).then(response =>{
        return response.json();
    }).then(data4 => {
        console.log(data4);
        get2ChampInfo(data4);
    })
}

function get2ChampInfo(data4){
    fetch('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json').then(response => {
        return response.json();
    }).then(data5 => {
        console.log(data5);
        displayFreeChamp(data4, data5);
    })
}

function displayFreeChamp(data4, data5) {          
    console.log('displayChampInfo()');
    console.log(data4);
    console.log(data4.freeChampionIds.length);

    let ddata5 = data5.data;
    // displaying free champion 
    for (let i = 0; i < data4.freeChampionIds.length; i++) {
        for (const champions in ddata5) {
            if (ddata5.hasOwnProperty(champions)) {
                const championKey = ddata5[champions].key;
                let championName = ddata5[champions].id;

                if (data4.freeChampionIds[i] == championKey) {

                    let proChampions = document.getElementById('free-champs');

                    let champImg = document.createElement('img');
                    champImg.addEventListener('click', openWindow);

                    champImg.setAttribute('src', `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${championName}.png`);
                    champImg.setAttribute('id', `${championName}`);
                    champImg.setAttribute('title', `${championName}`);

                    proChampions.appendChild(champImg);

                }

            }
        }
    }
}

function displaySummInfo(details) {
    console.log('displaySummInfo()');

    while (summInfoContainer.firstChild) {
        summInfoContainer.removeChild(summInfoContainer.firstChild);
    }
    //taking the summoner informations and extracting informations
    let summName = document.createElement('h2'); //creates h2 for summoner name.
    let summlvl = document.createElement('h4'); //creates h4 for summoner level.
    let lastPlayed = document.createElement('h4');
    let lPlayed = new Date(details.revisionDate);


    summName.innerText = `${details.name} Lvl. ${details.summonerLevel}`;
    lastPlayed.innerText = `Last played: ${lPlayed.toLocaleDateString()}`; //takes the last date the summoner was updated|converts into date.
    summInfoContainer.appendChild(summName);   // now I have to append the elements into the div id 'summ-info'
    summInfoContainer.appendChild(summlvl);
    summInfoContainer.appendChild(lastPlayed);
}


// displayChampInfo() takes in data2 to get the champion ID number for champs mastered and data3 takes the json object for those champs

function displayChampInfo(data2, data3) {          
    // console.log('displayChampInfo()');

    let ddata3 = data3.data;
    //displaying champion mastery.
    for (let i = 0; i < 10; i++) {
        for (let champions in ddata3) {
            if (ddata3.hasOwnProperty(champions)) {
                let championKey = ddata3[champions].key;
                let championName = ddata3[champions].id;

                if (data2[i].championId == championKey) {

                    let champContainer = document.createElement('div');
                    champContainer.setAttribute('class', 'card');


                    let champDetails = document.createElement('div');
                    champDetails.setAttribute('class', 'details');

                    let champName = document.createElement('h3');
                    let champLvl = document.createElement('h4');
                    let champImg = document.createElement('img');
                    champImg.addEventListener('click', openWindow);

                    champImg.setAttribute('src', `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${ddata3[champions].id}.png`);
                    champImg.setAttribute('id', `${ddata3[champions].id}`)

                    champName.innerText = championName;
                    champLvl.innerText = `Level: ${data2[i].championLevel} Points: ${data2[i].championPoints}`;

                    champDetails.appendChild(champName);
                    champDetails.appendChild(champLvl);

                    champContainer.appendChild(champImg);
                    champContainer.appendChild(champDetails);

                    summInfoContainer.appendChild(champContainer);

                }


            }
        }
    }
}



// opens a new window and creates a session stored item to pass to that window's .js file
function openWindow() {
    console.log('openWindow()');
    let target = event.target.id;

    sessionStorage.setItem('championTitle', event.target.id);
    console.log(target);

    window.open('champDetails.html', 'height:200px,width:200px');

}




