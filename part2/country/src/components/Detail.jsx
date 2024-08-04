import React, { useState, useEffect } from "react";
import axios from "axios";

const Detail = ({ name }) => {
  const [country, setData] = useState(null);
  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryResponse = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
        );
        setData(countryResponse.data);

        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.WEATHER_API}
`
        );
        setWeather(weatherResponse.data);

        if (weatherResponse.data) {
          const iconResponse = await axios.get(
            `https://openweathermap.org/img/wn/${weatherResponse.data.weather[0].icon}@2x.png`,
            { responseType: "blob" } // Use 'blob' to handle image data
          );
          const iconUrl = URL.createObjectURL(iconResponse.data);
          setIcon(iconUrl);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [name]);

  return (
    <div>
      {country && (
        <>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital ? country.capital.join(", ") : "N/A"}</p>
          <p>Area: {country.area} km²</p>
          <h2>Languages</h2>
          <ul>
            {Object.entries(country.languages).map(([key, value]) => (
              <li key={key}>{value}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={country.name.common} />
          {weather && (
            <>
              <h1>Weather in {name}</h1>
              <p>
                Temperature:
                {weather.main.temp - 273.15}
                °C
              </p>
              {icon && <img src={icon} alt="Weather Icon" />}
              <p>Wind: {weather.wind.speed} m/s</p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Detail;
