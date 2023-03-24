import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountry';

const DEBOUNCE_DELAY = 300;
const TIMEOUT_NOTIFICATION = 5000;

const refs = {
  inputEl: document.querySelector('#search-box'),
  countriesListEL: document.querySelector('.country-list'),
  infoAboutCountryEl: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener(
  'input',
  debounce(onSeachCountry, DEBOUNCE_DELAY)
);

function onSeachCountry(event) {
  const valueInput = event.target.value.trim();

  fetchCountries(valueInput)
    .then(onRenderCountriesList)
    .catch(error => {
      Notify.failure('Oops, there is no country with that name', {
        timeout: TIMEOUT_NOTIFICATION,
      });
      refs.countriesListEL.innerHTML = '';
      refs.infoAboutCountryEl.innerHTML = '';
    });
}

function onRenderCountriesList(countries) {
  const numberCountriesFound = countries.length;

  const markupCountriesList = countries
    .map(
      ({ name: { official }, flags: { svg } }) =>
        `<li class="country"><img src="${svg}" alt=Flag of ${official}/><h1>${official}</h1></li>`
    )
    .join('');

  refs.countriesListEL.innerHTML = markupCountriesList;

  if (numberCountriesFound === 1) {
    const renderBigCountry = document.querySelector('.country');
    renderBigCountry.classList.add('one_country');

    const markupInfoAboutCountry = countries
      .map(
        ({ capital, population, languages }) =>
          `<p><b>Capital: </b>${capital}</p>
            <p><b>Population: </b>${population}</p>
            <p><b>Languages: </b>${Object.values(languages)}</p>`
      )
      .join('');

    refs.infoAboutCountryEl.innerHTML = markupInfoAboutCountry;
    return;
  }

  if (numberCountriesFound > 10) {
    Notify.warning(
      'Too many matches found. Please enter a more specific name',
      {
        timeout: TIMEOUT_NOTIFICATION,
      }
    );
  }
  refs.infoAboutCountryEl.innerHTML = '';
}
