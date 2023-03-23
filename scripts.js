let characterData;
let dialogData;
let currentDialogObj;
const onClickEvents = [];

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
        CreateNextLine(dialogData[thisLine]);
    }



}

function CreateNextLine(dialogObj) {

    const character = GetCharacterByID(dialogObj.speakerID);
    const characterType = character.type;

    CreateMessage(dialogObj, character);

    switch (characterType) {
        case 'main':

            break;
        default:
            currentDialogObj = dialogObj;
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

        card.addEventListener("click", () => SelectResponse(dialogObj));
    }


    card.classList.add('card');
    card = SetCardColors(card, characterObj);

    let body = document.createElement('div');
    body.classList.add('card-body');
    body.textContent = dialogObj.text;

    card.appendChild(body);
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
        const clone = thisCard.cloneNode(true);
        thisCard.replaceWith(clone);
    });

    nextDialogObj = dialogData[dialogObj.nextLine];
    CreateNextLine(nextDialogObj);
}

FetchCharacters();
FetchDialog();

