let champName = sessionStorage.getItem('championTitle');
// console.log(champName);


document.getElementById("profile").style.backgroundImage
   = `url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_0.jpg')`;

let mainContainer = document.getElementById('champ-details');
document.body.style.backgroundImage = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ashe_0.jpg`

let champTitleContainer = document.getElementById('champ-title');

let champTopContainer = document.getElementById('champ-top');
let champImgContainer = document.getElementById('champ-img');
let champSkillContainer = document.getElementById('champ-skills');

let champBotContainer = document.getElementById('champ-bot');
let champStatsContainer = document.getElementById('champ-stats');
let champAllyTipsContainer = document.getElementById('champ-ally-tips');
let champDetailsContainer = document.getElementById('champ-tips'); 
let champStoryContainer = document.getElementById('champ-story');


fetch(`http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion/${champName}.json`).then(response => {
     return response.json();
}).then(data =>{
    console.log(data);
    displayChampions(data.data);
})

function displayChampions(data) {
    console.log('displayChampion()');
    console.log(data);
    for (const champions in data) {
      if (data.hasOwnProperty(champions)) {
        let cName = document.createElement('h1');
        let cImg = document.createElement('img');
        let sPassive = document.createElement('div');
        let sPassiveDescription = document.createElement('p');
        let sPassiveKey = document.createElement('h3');
        let sImg = document.createElement('img');
        let qContainer = document.createElement('div');
        let qImg = document.createElement('img');
        let qSkill = document.createElement('h3');
        let qSkillDescription = document.createElement('p');
        let wContainer = document.createElement('div');
        let wImg = document.createElement('img');
        let wSkill = document.createElement('h3');
        let wSkillDescription = document.createElement('p');
        let eContainer = document.createElement('div');
        let eImg = document.createElement('img');
        let eSkill = document.createElement('h3');
        let eSkillDescription = document.createElement('p');
        let rContainer = document.createElement('div');
        let rImg = document.createElement('img');
        let rSkill = document.createElement('h3');
        let rSkillDescription = document.createElement('p');

        cName.innerText = `${data[champions].id} - ${data[champions].title}`

        sPassive.setAttribute('class', 'skills');
        qContainer.setAttribute('class', 'skills');
        wContainer.setAttribute('class', 'skills');
        eContainer.setAttribute('class', 'skills');
        rContainer.setAttribute('class', 'skills');
        
        cImg.setAttribute('src', `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${data[champions].id}_0.jpg`);
        qImg.setAttribute('src', `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${data[champions].spells[0].image.full}`);
        wImg.setAttribute('src', `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${data[champions].spells[1].image.full}`);
        eImg.setAttribute('src', `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${data[champions].spells[2].image.full}`);
        rImg.setAttribute('src', `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${data[champions].spells[3].image.full}`);
        sImg.setAttribute('src', `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/passive/${data[champions].passive.image.full}`);
        sPassiveDescription.innerText = data[champions].passive.description;
        sPassiveKey.innerText = `Passive: ${data[champions].passive.name}`;

        qSkill.innerText = `Q: ${data[champions].spells[0].name}`;
        qSkillDescription.innerHTML = data[champions].spells[0].description;
        wSkill.innerText = `W: ${data[champions].spells[1].name}`;
        wSkillDescription.innerHTML = data[champions].spells[1].description;
        eSkill.innerText = `E: ${data[champions].spells[2].name}`;
        eSkillDescription.innerHTML = data[champions].spells[2].description;
        rSkill.innerText = `R: ${data[champions].spells[3].name} (Ultimate)`;
        rSkillDescription.innerHTML = data[champions].spells[3].description;

        sPassive.appendChild(sPassiveKey);
        sPassive.appendChild(sImg);
        sPassive.appendChild(sPassiveDescription);

        qContainer.appendChild(qSkill);
        qContainer.appendChild(qImg);
        qContainer.appendChild(qSkillDescription);

        wContainer.appendChild(wSkill);
        wContainer.appendChild(wImg);
        wContainer.appendChild(wSkillDescription);

        eContainer.appendChild(eSkill);
        eContainer.appendChild(eImg);
        eContainer.appendChild(eSkillDescription);

        rContainer.appendChild(rSkill);
        rContainer.appendChild(rImg);
        rContainer.appendChild(rSkillDescription);

        champSkillContainer.appendChild(sPassive);
        champSkillContainer.appendChild(qContainer);
        champSkillContainer.appendChild(wContainer);
        champSkillContainer.appendChild(eContainer);
        champSkillContainer.appendChild(rContainer);
        
        champTitleContainer.appendChild(cName);
        champImgContainer.appendChild(cImg);
        
        let cTag = document.createElement('h2');
        let cAttack = document.createElement('h2');
        let cDefense = document.createElement('h2');
        let cDifficulty = document.createElement('h2');
        let cMagic = document.createElement('h2');

        cTag.setAttribute('id', 'champ-tag');

        
        cTag.innerText = data[champions].tags;
        cAttack.innerText = `Attack: ${data[champions].info.attack}`;
        cDefense.innerText = `Defense: ${data[champions].info.defense}`;
        cDifficulty.innerText = `Difficulty: ${data[champions].info.difficulty}`;
        cMagic.innerText = `Magic: ${data[champions].info.magic}`;

        champStatsContainer.appendChild(cTag);
        champStatsContainer.appendChild(cAttack);
        champStatsContainer.appendChild(cDefense);
        champStatsContainer.appendChild(cDifficulty);
        champStatsContainer.appendChild(cMagic);

        let cTips;
        let cATips;
        let cStory = document.createElement('p');

        for(let i = 0; i<data[champions].enemytips.length; i++){
            cTips = document.createElement('p'); 
            cTips.innerText = data[champions].enemytips[i];
            champDetailsContainer.appendChild(cTips);
        }

        for(let i=0; i<data[champions].allytips.length; i++){
            cATips = document.createElement('p'); 
            cATips.innerText = data[champions].allytips[i];
            champAllyTipsContainer.appendChild(cATips);
        }
        
        cStory.innerHTML = data[champions].lore;

        // champDetailsContainer.appendChild(cTips);
        champStoryContainer.appendChild(cStory);
        

        console.log(data[champions].passive.image.full);


        
      }
    }
  }


        