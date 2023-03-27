function GetCharacterByID(id) {
    return characterData[id]
}

function GetMsgElementId(dialogObj) {
    return "msg-" + dialogObj.id;
}

function GetCardElementId(dialogObj) {
    return "card-" + dialogObj.id;
}

function GetDialogObjByElementId(idString) {
    var regex = /\d+/g;
    var matches = idString.match(regex);  // creates array from matches
    let dialogObjId = Number(matches.toString());
    
    return dialogData[dialogObjId];
}

function GetCharacterNameById(charId) {
    
}