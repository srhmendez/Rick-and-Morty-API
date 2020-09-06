/*
const response is awaiting the fetch call to fetch the API
the next line of code after the const response, is awaiting the promise 
that is returned from the const response. The response is fetched, the next line of code is carried out.
the string of information is then displayed in the console log. Thec onst respons code has to be wrapped in 
an async function.
*/

/* commenting out the initial function below to condense and simplify the code into a reusable engine(thefunction)

async function getRickandmortyData(url){
const response = await fetch(url)
return await response.json()
}
*/

/*Now that the commented out function above is defined, we will do a try catch function below to test things 
and catch any errors.
When writing the try catch function the code below does the following:
we are defining the constant data to await the get RickandmortyData async function above
we are telling the getRickandmortyData function to pull data from the characters on the api
then to display said data as JSON objects in the console log. 
the catch error function catches any errors and then displays the error on the console log
await is always paired with async. await has to be contained in an async function as shown above and below
changed the stringify JSON data option for the try console log below to just data to see how things are labeled*/



/*Function that gets the information or data from the API*/


async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error) 
    }
    }

    


const newCharButton = document.querySelector('.newcharacterbutton')
newCharButton.addEventListener('click', function() {
    let charID = prompt("Add a character number between 0 & 493")
    if (charID > 0 && charID <= 493)
    getAPIData(`https://rickandmortyapi.com/api/character/${charID}`)
    .then(result =>{
        populateDOM(result)
    }) 

else {
        
        alert('There are no characters with that ID number, please use a valid ID number.')
    }   
});

const femaleCharButton = document.querySelector('.femalecharacterbutton')
femaleCharButton.addEventListener('click', function() {
          
    const femaleCharacters = getAPIData(`https://rickandmortyapi.com/api/character/?gender=female`)
    .then(data => {
        for (const femaleCharacters of data.results) {
        getAPIData(femaleCharacters.url)
        .then(characterdata => {
            populateDOM(characterdata)
            })
        }
    })





//refactoring code is when you rethink the code you used to try and make it more simple and efficient
/*theData function below gets the character information from the online repository and the takes the data 
and populates the DOM with the information that is then displayed in the console panel.*/



const theData = getAPIData(`https://rickandmortyapi.com/api/character/?page=1&2`)
.then(data => {
    for (const characters of data.results) {
    getAPIData(characters.url)
    .then(characterdata => {
        populateDOM(characterdata)
        })
    }
})



console.log(theData)

/*The let function below is assigning a value mainArea to the 'main' section tag in the html code
this allows the code to follow to populate the dom elements in the main section of the html document 
thus allowing DOM elements to appear.*/

let mainArea = document.querySelector('main')

/*function below creates DOM elelments like div and assigns them a value that corresponds
to values in the API like name, gender, status, pic  */

function populateDOM(single_character) {
    let characterScene = document.createElement('div')
    let characterCard = document.createElement('div')
    let characterFront = document.createElement('div')
    let characterBack = document.createElement('div')
   
    
    fillCardFront(characterFront, single_character)
    fillCardBack(characterBack, single_character)
 

  /* The functions below assign CSS attributes to the DOM elelments that we created above. this
  allows you to create classes and style the DOM elements that we have created in JavaScript */

    characterCard.setAttribute('class', 'card')
    characterScene.setAttribute('class', 'scene')
    
   
    
    characterCard.appendChild(characterFront)
    characterCard.appendChild(characterBack)
    characterScene.appendChild(characterCard)
   

/*We then append the DOM elements we created and then appended text to into the full DOM model */

    mainArea.appendChild(characterScene)
  
    
 /*This is the Function that flips the card upon clicking*/

    characterCard.addEventListener( 'click', function() {
      characterCard.classList.toggle('is-flipped');
    });

}



function fillCardFront(characterFront, data) {

    characterFront.setAttribute('class', 'card__face card__face--front')

    let name = document.createElement('h2')
    let pic = document.createElement('img') 
    
    name.setAttribute('class', 'card__face card__face--front')
    pic.setAttribute('class', 'card_face card__face--front')

    name.textContent = data.name
    pic.src = `https://rickandmortyapi.com/api/character/avatar/${data.id}.jpeg`

    characterFront.appendChild(name)
    characterFront.appendChild(pic)
    
}
function fillCardBack(characterBack, data) {

    characterBack.setAttribute('class', 'card__face card__face--back')

    let stats = document.createElement('h2')
    let gender = document.createElement('p')
    let status = document.createElement('p')
    let species = document.createElement('p')

    stats.setAttribute('class', 'stats')
    stats.textContent = ('Stats')
    characterBack.appendChild(stats)
    

    gender.setAttribute('class', 'backdata')
    gender.textContent = data.gender
    characterBack.appendChild(gender)

    status.setAttribute('class', 'backdata')
    status.textContent = data.status
    characterBack.appendChild(status)

    species.setAttribute('class', 'backdata')
    species.textContent = data.species
    characterBack.appendChild(species)

    

}


function getCharacterNumber(charURL) {
    let end = charURL.lastIndexOf('/')
    let charID= charURL.substring(0,end)
        return charID 
         
}



