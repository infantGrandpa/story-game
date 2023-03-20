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

async function fetchDataLocal() {

    const requestURL = 'https://raw.githubusercontent.com/infantGrandpa/story-game/main/story-game.json';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const data = await response.json();

    const packageData = data.Packages[0];
    const modelsData = packageData.Models;

    populateModels(modelsData);
}

function populateModels(obj) {

    const section = document.querySelector('section');

    const characters = obj;
    console.log(characters);

    const typeList = document.createElement('ul');

    for (const thisModel of obj) {
        const type = thisModel.Type;
        const newListItem = document.createElement('li');
        newListItem.textContent = type;
        typeList.appendChild(newListItem);
    }

    section.appendChild(typeList);

}

fetchDataLocal();

