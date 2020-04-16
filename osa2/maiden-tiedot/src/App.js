import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowCountryDetails = ({ country }) => {
  const mystyle = {
    maxWidth: "15%",
    height: "auto"
  };

  return (
    <>
      <h1> {country.name} </h1>
      capital: {country.capital}<br />
      population: {country.population}<br />
      <h2>languages</h2>
      <ul>
        {country.languages.map(l => <li key={l.iso639_2}>{l.name}</li>)}
      </ul>
      <img alt='flag' src={country.flag} style={mystyle} />

    </>
  )
}

const Country = ({ country }) => <p> {country.name} </p>

const ShowCountries = ({ countries, countryFilter }) => {

  let countryList = countries
    .filter(country => country.name.toLowerCase().includes(countryFilter.toLowerCase()))

  let numberOfCountries = countryList.length;

  if (numberOfCountries === 1) {

    return countryList.map(country => <ShowCountryDetails key={country.alpha3Code} country={country} />);

  } else if (numberOfCountries > 1 && numberOfCountries <= 10) {

    return countryList.map((country) => <Country key={country.alpha3Code} country={country} />);

  }

  return 'Too many matches, specify another filter'
}

const Filter = ({ filter, handleChange }) => {
  return (
    <div>
      find countries <input value={filter} onChange={handleChange} />
    </div>
  )
}

const App = () => {

  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data);
        setCountries(response.data);
      });
  }, []);

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value);
  }

  return (
    <div>
      <Filter filter={countryFilter} handleChange={handleFilterChange} />
      <ShowCountries countries={countries} countryFilter={countryFilter} />
    </div>
  );
}

export default App;
