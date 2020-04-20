import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ country, localWeather }) => {
  return (
    <>
      <h2> Weather in {country.capital} </h2>
      <strong>temperature: </strong> {localWeather ? 'localWeather.current.temperature' : ''}
    </>
  )
}

const ShowCountryDetails = ({ country, localWeather }) => {
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
      <Weather country={country} localWeather={localWeather} />
    </>
  )
}

const Country = ({ country, handleShowCountryDetails }) => {
  return (
    <p>
      {country.name}
      <button onClick={() => handleShowCountryDetails(country)}>
        show
      </button>
    </p>
  )
}

const ShowCountries = ({ countries, countryFilter, handleShowCountryDetails }) => {

  let countryList = countries
    .filter(country => country.name.toLowerCase().includes(countryFilter.toLowerCase()))

  let numberOfCountries = countryList.length;

  if (numberOfCountries === 1) {

    return countryList.map(country => <ShowCountryDetails key={country.alpha3Code} country={country} />);

  } else if (numberOfCountries > 1 && numberOfCountries <= 10) {
    return countryList.map((country) => {
      return (
        <Country
          key={country.alpha3Code}
          handleShowCountryDetails={handleShowCountryDetails}
          country={country} />
      );
    })
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
  const [showDetails, setShowDetails] = useState(false);
  const [country, setCountry] = useState(null);
  const [localWeather, setLocalWeather] = useState(null)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  const handleFilterChange = (event) => {
    setShowDetails(false);
    setCountryFilter(event.target.value);
  }

  const handleShowCountryDetails = (country) => {
    const api_key = process.env.REACT_APP_API_KEY
    setShowDetails(true)
    setCountry(country)

    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}&units=m`)
      .then(response => {
        setLocalWeather(response.data)
      })
  }

  return (
    <div>
      <Filter filter={countryFilter} handleChange={handleFilterChange} />

      {showDetails ?
        <>
          <ShowCountryDetails country={country} localWeather={localWeather} />
        </>
        :
        <ShowCountries
          countries={countries}
          countryFilter={countryFilter}
          handleShowCountryDetails={handleShowCountryDetails} />
      }
    </div>
  );
}

export default App;
