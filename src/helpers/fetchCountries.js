
const searchParams = new URLSearchParams({
  fields: 'name,languages,flags,population,capital',
});

export default function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name.trim()}?${searchParams}`)
    .then(response => {
      if (response.status === 404) {
        throw new Error()
      }
      return response.json()
    })
}