function CreateEachNextLine(dialogObj) {
    for (const thisLine of dialogObj.nextLine) {
        console.log("Creating dialog after " + dialogObj.id + " (" + thisLine + ")...")
        CreateNextLine(GetDialogObjById(thisLine));
    }
}

function CreateNextLine(dialogObj) {

    const character = GetCharacterByID(dialogObj.speakerID);
    const characterType = character.type;

    CreateMessage(dialogObj, character);

    if (characterType != "main") {
        SetCurrentDialogObj(dialogObj);
    }

}

function CreateMessage(dialogObj, characterObj) {
    const section = document.querySelector('.conversation');

    let msg = CreateMsgContainer(dialogObj, characterObj);

    let card = CreateMsgCard(dialogObj, characterObj);
    msg.appendChild(card);

    let author = CreateAuthor(characterObj);
    if (author !== undefined) {
        msg.appendChild(author);
    }

    section.insertBefore(msg, section.firstChild);
    window.getComputedStyle(section).height;

    DelayBeforeAction(dialogObj)

}

function DelayBeforeAction(dialogObj) {
    const thisDelay = dialogObj.delayMS ?? 1000;

    setTimeout(function () {
        console.log("Delay complete. Processing Action.");
        ProcessAction(dialogObj);
    }, thisDelay);
}


function CreateMsgContainer(dialogObj, characterObj) {
    const characterType = characterObj.type;

    let msg = document.createElement('li');
    msg.classList.add('message');
    msg = SetMsgClassByType(msg, characterType);
    msg.id = GetMsgElementId(dialogObj);

    return msg;
}

function CreateMsgCard(dialogObj, characterObj) {

    let card = document.createElement('div');

    if (characterObj.type == 'main') {
        card.classList.add('option');

        card.addEventListener("click", () => SelectResponse(dialogObj));
    }


    card.classList.add('card');
    card.id = GetCardElementId(dialogObj);
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

function ProcessAction(dialogObj) {

    if (dialogObj.action === undefined) {
        return;
    }

    for (const thisAction of dialogObj.action) {
        const actionType = thisAction.type;
        switch (actionType) {
            case 'nextLine':
                console.log("Showing next dialog " + dialogObj.nextLine + "...");
                CreateEachNextLine(dialogObj);
                break;
            default:
                console.log("No action.");
                break;
        }
    }


}

function DeleteMsgByDialogObj(dialogObj) {
    const msgToDelete = document.getElementById(GetMsgElementId(dialogObj));
    msgToDelete.remove();
}