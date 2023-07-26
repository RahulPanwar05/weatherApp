import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cityName, setCityName] = useState("mumbai");
  const [tempData, setTempData] = useState();
  const [apiData,setApiData]=useState()

  const apiKey = "6ef66848876ecd54b357798f7cc82781";

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
      );
      const result = await resp.json();
      console.log(result);
      setApiData(result)
      setTempData(result.main);
    };
    fetchData();
  }, [cityName]);

  const kelvinToCelcius = (temp) => {
    const tempInCelcius = temp - 273.13;
    return tempInCelcius.toFixed(0) + "";
  };

  return (
    <>
      <div className="main">
        <input
          value={cityName}
          type="text"
          name="city"
          id=""
          placeholder="Enter your city name"
          onChange={(e) => setCityName(e.target.value)}
        />
        {!tempData ? (
          <p>data not found</p>
        ) : (
          <div className="temp">
            <div>
            <i className="fa-solid fa-cloud icon fa-5x"></i>
              <p>
                {kelvinToCelcius(tempData.temp)} <sup>&#8451;</sup>
              </p>
              <div>
                <p>Humidity: {tempData.humidity}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
