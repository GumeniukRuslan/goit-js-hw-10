import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './helpers/fetchCountries';

const searchField = document.querySelector('#search-box');
const countryMatchedList = document.querySelector('.country-list')
const oneCountryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 1000;

searchField.addEventListener('input', debounce(magic, DEBOUNCE_DELAY));


function magic(evt) {
  if (evt.target.value.trim() === '') {
    return 
  };
  fetchCountries(evt.target.value);
};

function makeList(dataArr) {
  const countyList = dataArr.map(country => `<li>
        <p>
          <img src="${country.flags.svg}" alt="флаг країни ${country.name.official}">
          <span>${country.name.official}</span>
        </p>
      </li>`).join('');
  countryMatchedList.innerHTML = countyList;
};

function makeOneCountyOnfo(dataArr) {
  oneCountryInfo.innerHTML = 
  `<h1><img width=15 src="${dataArr[0].flags.svg}" alt="флаг країни ${dataArr[0].name.official}"> ${dataArr[0].name.official}</h1>
      <p>
        <h2>Capital:</h2>
        <span>${dataArr[0].name.official}</span>
      </p>
      <p>
        <h2>Population:</h2>
        <span>${dataArr[0].population}</span>
      </p>
      <p>
        <h2>Languages:</h2>
        <span>${dataArr[0].languages}</span>
      </p>`
};