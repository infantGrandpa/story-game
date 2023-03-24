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

function SelectResponse(dialogObj) {
    const possibleResponses = document.querySelectorAll(".option");
    const selectedId = GetCardElementId(dialogObj);

    possibleResponses.forEach((thisCard) => {
        thisCard.classList.remove('option');
        if (thisCard.id != selectedId) {
            DeleteMsgByDialogObj(GetDialogObjByElementId(thisCard.id));
        }

        const clone = thisCard.cloneNode(true);
        thisCard.replaceWith(clone);
    });

    nextDialogObj = dialogData[dialogObj.nextLine];
    CreateNextLine(nextDialogObj);
}

FetchCharacters();
FetchDialog();

