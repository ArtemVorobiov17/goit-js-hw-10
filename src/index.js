import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries'
import './css/styles.css';


const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


const onSearch = debounce(evt => {
    const name = evt.target.value.trim();
    if (!name) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        return;
    }
    fetchCountries(name)
        .then(selectionCountry)
        .catch(error => console.log(error))
}, DEBOUNCE_DELAY);



function selectionCountry(countries) {
    const arr = countries.length;
    if (arr > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        return;
    }
    if (arr > 1) {
        countryList.innerHTML = '';
        return markupCountryAll(countries);
    }
    if (arr === 1) {
        countryInfo.innerHTML = '';
        return markupCountryOne(countries);
    }  
} 


function markupCountryOne(countries) {
    const markup = countries.map(country => {
        return `<img src="${country.flags.svg}" width="50" height="35" alt="Flag" />
        <h2 class="country-title">${country.name.official}</h2>
        <p>Capital: <span>${country.capital}</span></p>
        <p>Population: <span>${country.population}</span></p>
        <p>Languages: <span>${Object.values(country.languages)}</span></p>`
    }).join('');
    countryList.innerHTML = markup;
}


function markupCountryAll(countries) {
    const markup = countries.map(country => {
        return `<li class="country">
            <img src="${country.flags.svg}" width="50" height="35" alt="Flag" />
            <p>${country.name.official}</p>
        </li>`
    }).join('');
    countryInfo.innerHTML = markup;
}

searchInput.addEventListener('input', onSearch);

