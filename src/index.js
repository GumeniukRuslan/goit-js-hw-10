import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './helpers/fetchCountries';

const searchField = document.querySelector('#search-box');
const countryMatchedList = document.querySelector('.country-list')
const oneCountryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 500;

searchField.addEventListener('input', debounce(createMarkup, DEBOUNCE_DELAY));


function createMarkup(evt) {
  resetMarkup();
  if (!evt.target.value.trim()) {
    return 
  };
  fetchCountries(evt.target.value).then(chooseMarkupType)
    .catch(() => Notiflix.Notify.failure('Oops, there is no country with that name.'))
};

function chooseMarkupType(dataArr) {
  if (dataArr.length === 1) {
      return makeOneCountyInfo(dataArr)
    } else if (dataArr.length >= 2 && dataArr.length <= 10) {
      return makeList(dataArr);
    } else if (dataArr.length > 10) {
      return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
};

function makeList(dataArr) {
  resetMarkup()
  const countyList = dataArr.map(country => `<li>
        <img class="country-flag" src="${country.flags.svg}" alt="флаг країни ${country.name.official}">
        <p>${country.name.official}</p>
      </li>`).join('');
  countryMatchedList.innerHTML = countyList;
};

function makeOneCountyInfo(dataArr) {
  resetMarkup()
  const languages = Object.values(dataArr[0].languages).join(', ');
  oneCountryInfo.innerHTML = 
    `<div class='one-card'>
    <h1><img class="country-flag" src="${dataArr[0].flags.svg}" alt="флаг країни ${dataArr[0].name.official}"> ${dataArr[0].name.official}</h1>
      <div class="info-part">
        <h2>Capital:</h2>
        <span>${dataArr[0].capital}</span>
      </div>
      <div class="info-part">
        <h2>Population:</h2>
        <span>${dataArr[0].population}</span>
      </div>
      <div class="info-part">
        <h2>Languages:</h2>
        <span>${languages}</span>
      </div>
    </div>`
};

function resetMarkup() {
  countryMatchedList.innerHTML = '';
  oneCountryInfo.innerHTML = ''
}