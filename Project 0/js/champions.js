const blocks = document.getElementById('champs');


// const container = document.createElement('div');
// container.setAttribute('class', 'container');







fetch('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json').then(response => {
  return response.json();
}).then(data => {

  console.log(data.data);
  displayChampions(data.data);
}).catch(err => {
  console.log('Couldn"t fetch');
});


//using the for in loop with nested if block to extract informations out of nested objects withing JSON object.
function displayChampions(data) {
  for (const champions in data) {
    if (data.hasOwnProperty(champions)) {
      let champContainer = document.createElement('div');
      champContainer.setAttribute('class', 'card');
      champContainer.setAttribute('title', `${data[champions].id}`);


      let champDetails = document.createElement('div');
      champDetails.setAttribute('class', 'details');

      let champImg = document.createElement('img');
      champImg.setAttribute('src', `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${data[champions].id}.png`);
      champImg.setAttribute('id', `${data[champions].id}`);
      champImg.addEventListener('click', openWindow);

      let champType = document.createElement('p');
      champType.setAttribute('class', `tags`);  //tags `${data[champions].tags}`

      let champTitle = document.createElement('h3');


      champTitle.innerText = `${data[champions].id}`;
      champType.innerText = `Type: ${data[champions].tags}`;

      champContainer.appendChild(champImg);
      champDetails.appendChild(champTitle);
      champDetails.appendChild(champType);
      champContainer.appendChild(champDetails);

      blocks.appendChild(champContainer);

    }
  }
}

let champCards = document.getElementsByClassName('card'); //champions cards displayed in blocks with id = "champs" (global)

let checkForm = document.getElementById('form');          //radio inputs inside the form container with id = "form"

console.log(champCards);                                  //prints out arrays of "cards" with champion image, name and type.

checkForm.addEventListener('change', filterChamps);       //event listener for radio filter to filter out champion cards.

function filterChamps() {                                 //function called in event listener for filtering champion cards.
  // console.log(event.target);
  // console.log('filterChamps');
  
  let champTags = document.getElementsByClassName('card');
  let target = event.target;
  let filterValue = target.value;
  console.log(filterValue);

  for (let i = 0; i < champCards.length; i++) {
    let counter = champTags[i].lastChild.lastChild.textContent;
    champCards[i].style.display ='block';
    if(filterValue == 'All'){
      champCards[i].style.display = 'block';
    }else if (!counter.includes(filterValue)) {
      champCards[i].style.display = 'none';
    }
  }
}

function openWindow(){                                    // opens a new window by click event on the image.
  console.log('openWindow()');
  let target = event.target.id;                           // gets the id property of the image

  sessionStorage.setItem('championTitle', event.target.id);
  console.log(target);

  window.open('champDetails.html', 'height:200px,width:200px');
  
}

let searchInput = document.getElementById('search-text');

searchInput.addEventListener('input', searchFilter);

function searchFilter(){
  // let input, filter, 
  // console.log(searchInput.value);
  let champTags = document.getElementsByClassName('card');
  
  
  let searchValue = searchInput.value.toUpperCase();


  for (let i = 0; i < champCards.length; i++) {
    let counter = champTags[i].title.toUpperCase();

    if(counter.indexOf(searchValue) > -1){
      champCards[i].style.display = '';
    }else{                                         
      champCards[i].style.display = 'none';
    }
  }
}


  






  








