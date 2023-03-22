let characterData;
let dialogData;
let currentDialogID;

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

    currentDialogID = 0;

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

function ShowCurrentDialog() {

    thisDialogObj = dialogData[currentDialogID]
    if (thisDialogObj === undefined) {
        console.log("Next dialogue is undefined");
        return;
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

    currentDialogID = dialogObj.nextLine;

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

    //section.appendChild(msg);
    section.insertBefore(msg, section.firstChild);
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
        card.addEventListener("click", function () { SelectResponse(dialogObj); }, { once: true });
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
    if (characterObj.type != 'secondary') {
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

function SelectResponse(dialogObj) {
    const possibleResponses = document.querySelectorAll(".option");
    possibleResponses.forEach((thisCard) => {
        thisCard.classList.remove('option');
    });

    nextDialogObj = dialogData[dialogObj.nextLine];
    CreateNextLine(nextDialogObj);
}

FetchCharacters();
FetchDialog();

