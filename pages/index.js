import { useEffect, useState } from "react";

export default function Home() {

  const [weatherData, setWeatherData] = useState(null);

  const [city, setCity] = useState('');

  const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${process.env.NEXT_PUBLIC_API_KEY}&include=minutely`


  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  // handling the form submission 
  const handleSubmit = (event) => {
    event.preventDefault(); // preventing page from reloading
    if(city === ''){
      alert('Please Enter City Name');
    }else{
      fetchData();
    }
    
  };

  return (
    
    <div className="py-4 h-screen bg-gradient-to-tl from-cyan-300 to-cyan-500">
      <h1 className="text-center text-5xl font-bold">Weather App</h1>

      <section className="shadow-xl max-w-[312px] m-auto mt-10 h-[30rem] py-4 bg-cyan-100 rounded-lg">

        <div className="mt-7">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input className=" max-w-[70%] text-lg py-1 m-auto text-center" type="text" value={city} onChange={handleInputChange} placeholder="Enter city" />
            <button className=" max-w-[50%] bg-cyan-400 m-auto px-4 py-2" type="submit">Get Weather</button>
          </form>
        </div>

        <div className="text-center mt-6 font-bold text-2xl">
        {/* Check if the weatherData variable is empty or not */}
          {weatherData && (
            <div>{weatherData.data.map((item, index) => {
              return (
                <div key={index}>
                 <img className="m-auto" width={70} src={`https://cdn.weatherbit.io/static/img/icons/${item.weather.icon}.png`} alt="weather icon" />
                  <p className="text-red-500 text-center">{item.city_name}</p>
                  <p>🌡️: {item.temp}°C ({item.weather.description})</p>
                  <p>💨: {item.wind_spd} m/s</p>
                  <p>🧭: {item.wind_dir}° {item.wind_cdir}</p>
                </div>
              )
            })}</div>

          )}
        </div>


      </section>


    </div>
  )
}