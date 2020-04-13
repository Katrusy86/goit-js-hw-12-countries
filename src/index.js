import './styles.css';
import {fetchCountries} from './fetchCountries';
import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';

const debounce = require('lodash.debounce')

const refs = {
    searchInput: document.querySelector('.input-value'),
    listItems: document.querySelector('#js-data'),
}

refs.searchInput.addEventListener('input', debounce(hardleInput, 500))

function hardleInput(e){
    e.preventDefault();
    const inputValue = e.target.value;
    if(inputValue === ''){
        return refs.listItems.innerHTML = '';
    }
        
    fetchCountries(inputValue).then(data => {
        // console.log(data[0])
        const name = data[0].name;
        const capital = data[0].capital;
        const population = data[0].population;
        const flag = data[0].flag;
        const languages = data[0].languages;

        template(name, capital, population, flag, languages);
        
        if(data.length > 10){
            PNotify.error({
                title: 'Oh No!',
                text: 'Too many matches found.Please enter a more specific query!'
            });
        
        } else if (data.length > 1 && data.length < 10){
         countriesName(data)            
        } 
    }).catch(error=>console.error('Error---:',error));
}

function countriesName(data) {
    const allname = data.map(country => templateName(country)).join('')
    refs.listItems.innerHTML = allname;
}

function templateName({name}){
    return `<li><p>${name}</p></li>`
}

function template(name, capital, population, flag, languages) {    
    const description = `
    <li>
        <h2>${name}</h2>
        <p style:"fon-weight=600"><strong>Capital:</strong> ${capital}</p>
        <p><strong>Population:</strong> ${population}</p>
        <p><strong>Languages:</strong> ${getLanguages(languages)}</p>  
        <img src="${flag}" alt="image" width="480">
    </li>`
    showList(description);
}

function getLanguages (languages) {
return languages.reduce((acc, language) => {
    return acc += `<li>${language.name}</li>` 
},'')
}

function showList(description) {
console.log(description);
refs.listItems.innerHTML = description;
}
