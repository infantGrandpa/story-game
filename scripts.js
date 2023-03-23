let characterData;
let dialogData;
let currentDialogObj;

async function fetchData() {

    const requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const superHeroes = await response.json();

    populateHeader(superHeroes);
    populateHeroes(superHeroes);
}

function populateHeader(obj) {
    const header = document.querySelector('header');
    const myH1 = document.createElement('h1');
    myH1.textContent = obj.squadName;
    header.appendChild(myH1);
}

function populateHeroes(obj) {
    const section = document.querySelector('section');
    const heroes = obj.members;

    for (const hero of heroes) {
        const myArticle = document.createElement('article');
        const myH2 = document.createElement('h2');
        const myPara1 = document.createElement('p');
        const myPara2 = document.createElement('p');
        const myPara3 = document.createElement('p');
        const myList = document.createElement('ul');

        myH2.textContent = hero.name;
        myPara1.textContent = `Secret Identity: ${hero.secretIdentiy}`;
        myPara2.textContent = `Age: ${hero.age}`;
        myPara3.textContent = 'Superpowers:';

        const superpowers = hero.powers;
        for (const power of superpowers) {
            const listItem = document.createElement('li');
            listItem.textContent = power;
            myList.appendChild(listItem);
        }

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);

        section.appendChild(myArticle);
    }

}

async function FetchCharacters() {

    const requestURL = 'https://raw.githubusercontent.com/infantGrandpa/story-game/main/data/characters.json';
    const request = new Request(requestURL);

    const response = await fetch(request);
    characterData = await response.json();

}

async function FetchDialog() {
    const requestURL = 'https://raw.githubusercontent.com/infantGrandpa/story-game/main/data/dialog.json';
    const request = new Request(requestURL);

    const response = await fetch(request);
    dialogData = await response.json();

    currentDialogObj = dialogData[0];

}

function PopulateCharacters(obj) {

    const section = document.querySelector('.conversation');

    const characters = obj;

    const characterList = document.createElement('ul');

    for (const thisCharacter of characters) {
        const name = thisCharacter.name;
        const newListItem = document.createElement('li');
        newListItem.textContent = name;
        characterList.appendChild(newListItem);
    }

    section.appendChild(characterList);

}

function ShowNextDialog() {

    
    if (currentDialogObj === undefined) {
        console.log("Next dialogue is undefined");
        return;
    }

    //For each next line
    for (const thisLine of currentDialogObj.nextLine) {
        console.log("nextLine: " + thisLine.id);
    }


    CreateNextLine(thisDialogObj);
}

function CreateNextLine(dialogObj) {

    const character = GetCharacterByID(dialogObj.speakerID);
    const characterType = character.type;

    switch (characterType) {
        case 'main':
            console.log('Creating main...');
            CreateMessage(dialogObj, character);
            break;
        default:
            CreateMessage(dialogObj, character);
            break;
    }

}

function CreateMessage(dialogObj, characterObj) {
    const section = document.querySelector('.conversation');
    const characterType = characterObj.type;

    let msg = CreateMsgContainer(characterType);

    let card = CreateMsgCard(dialogObj, characterObj);
    msg.appendChild(card);

    let author = CreateAuthor(characterObj);
    if (author !== undefined) {
        msg.appendChild(author);
    }

    section.appendChild(msg);
    window.getComputedStyle(section).height;

}

function CreateMsgContainer(characterType) {
    let msg = document.createElement('li');
    msg.classList.add('message');
    msg = SetMsgClassByType(msg, characterType);


    return msg;
}

function CreateMsgCard(dialogObj, characterObj) {

    let card = document.createElement('div');

    if (characterObj.type == 'main') {
        card.classList.add('option');
        card.addEventListener("click", function () { SelectResponse(dialogObj, card); }, { once: true });
    }


    card.classList.add('card');
    card = SetCardColors(card, characterObj);

    let body = document.createElement('div');
    body.classList.add('card-body');
    body.textContent = dialogObj.text;

    card.appendChild(body);
    console.log(card);
    return card;
}

function CreateAuthor(characterObj) {
    if (characterObj.type == 'narrator') {
        return;
    }

    let author = document.createElement('small');
    author.classList.add('author');
    author.textContent = characterObj.name;

    return author;
}

function SetMsgClassByType(msg, characterType) {
    changedMsg = msg;

    switch (characterType) {
        case 'main':
            changedMsg.classList.add('outgoing');
            break;
        case 'narrator':
            changedMsg.classList.add('narrator');
            break;
        default:
            changedMsg.classList.add('incoming');
            break;
    }

    return changedMsg;
}


function SetCardColors(card, character) {
    let changedCard = card;
    let backgroundColor = character.bodyColor;
    let color = character.textColor;

    changedCard.style.backgroundColor = backgroundColor;
    changedCard.style.color = color;

    return changedCard;
}

function GetCharacterByID(id) {
    return characterData[id]
}

function SelectResponse(dialogObj, card) {
    card.classList.remove('option');
    alert("Object " + dialogObj.id + " was clicked.");
}

FetchCharacters();
FetchDialog();

