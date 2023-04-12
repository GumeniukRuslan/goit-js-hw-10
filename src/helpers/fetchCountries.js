import Notiflix from 'notiflix';
const searchParams = new URLSearchParams({
  fields: 'name,languages,flags,population,capital',
});

export default function fetchCountries(name) {
  fetch(`https://restcountries.com/v3.1/name/${name}?${searchParams}`, )
    .then(response => response.json())
    .then(data => {
      if (data.length > 10) {
        return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      };
      return console.log(data)
    })
    // .catch
  
}