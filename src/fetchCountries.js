const baseUrl = 'https://restcountries.eu/rest/v2';

export const fetchCountries = searchQuery => {
return fetch(`${baseUrl}/name/${searchQuery}`)
.then(response => response.json())
.catch(error=>console.error('Error---:',error));
}
