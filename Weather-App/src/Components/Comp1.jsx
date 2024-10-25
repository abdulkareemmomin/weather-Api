import React, { useState } from 'react';

const Comp1 = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState({
        location: { name: 'Enter a city' },
        current: {
            temp_c: null,
            temp_f: null,
            condition: { text: 'N/A' },
            humidity: null,
            precip_mm: null,
            wind_kph: null,
        },
    });
    const [error, setError] = useState('');

    const API_KEY = 'd6290fc3878b461eb3b172920242410';

    const handleWeather = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`);
            if (!response.ok) {
                throw new Error(`City not found: ${city}`);
            }
            const data = await response.json();
            setWeather(data);
        } catch (err) {
            setError(err.message);
            // alert(`${err.message}: check your internet connection!`);
            console.log('failed from colsole.log',err.message);
            
        }
    };

    return (
        <>
            <div className='bg-blue-300 h-screen flex justify-center  items-center'>
                <div className='h-[90%] w-[60%] border rounded-md shadow-2xl bg-gray-500 border-gray-400 flex flex-col justify-center items-start p-5'>

                    {/* Input form */}
                    <form onSubmit={handleWeather} className="flex items-center w-full mb-5">
                        <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder='Enter City Name'
                            className='font-normal bg-gray-800 text-white p-1 placeholder:text-slate-300 placeholder:font-sans text-2xl text-center rounded-l-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out w-full'
                        />
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-lg px-6 py-[6px] shadow-md transition duration-300 ease-in-out"
                        >
                            Search
                        </button>
                    </form>

                    {/* Weather details */}
                    <div className='bg-gray-700 shadow-lg rounded-lg p-5 w-full'>
                        {error && <p className="text-blue-200 mt-2">{error}</p>}
                        <div className="mt-5">
                            <h2 className="text-2xl font-bold text-center text-white">{weather.location.name}</h2>
                            <p className="text-center text-white font-semibold">
                                Date: {new Date(weather.current.last_updated || Date.now()).toLocaleDateString()}
                            </p>
                            <p className="text-center text-white font-semibold">
                                Time: {new Date(weather.current.last_updated || Date.now()).toLocaleTimeString()}
                            </p>


                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-blue-100 rounded-lg p-4 shadow">
                                    <p className="text-xl font-bold">Temperature </p>
                                    <p className=' font-semibold'>{weather.current.temp_c !== null ? `${weather.current.temp_c} °C` : 'N/A'}</p>
                                    <p className=' font-semibold'>{weather.current.temp_f !== null ? `${weather.current.temp_f} °F` : 'N/A'}</p>
                                </div>
                                <div className="bg-green-100 rounded-lg p-4 shadow">
                                    <p className="text-xl font-semibold">Condition</p>
                                    <p className=' font-semibold'>{weather.current.condition.text}</p>
                                </div>
                                <div className="bg-yellow-100 rounded-lg p-4 shadow">
                                    <p className="text-xl font-semibold">Humidity</p>
                                    <p className=' font-semibold'>{weather.current.humidity !== null ? `${weather.current.humidity}%` : 'N/A'}</p>
                                </div>
                                <div className="bg-purple-100 rounded-lg p-4 shadow">
                                    <p className="text-xl font-semibold">Precipitation</p>
                                    <p className=' font-semibold'>{weather.current.precip_mm !== null ? `${weather.current.precip_mm} mm` : 'N/A'}</p>
                                </div>
                                <div className="bg-red-100 rounded-lg p-4 shadow">
                                    <p className="text-xl font-semibold">Wind Speed</p>
                                    <p className=' font-semibold'>{weather.current.wind_kph !== null ? `${weather.current.wind_kph} km/h` : 'N/A'}</p>
                                </div>
                                <div className="bg-orange-100 rounded-lg p-4 shadow">
                                    <p className="text-xl font-semibold">Rain</p>
                                    <p className=' font-semibold '>{weather.current.precip_mm > 0 ? 'Yes' : 'No'}</p>
                                </div>
                                {/* Uncomment to display sunset time if you add the forecast API */}
                                {/* <div className="bg-teal-100 rounded-lg p-4 shadow">
                                    <p className="text-xl font-semibold">Sunset</p>
                                    <p>{weather.forecast.forecastday[0].astro.sunset}</p>
                                </div> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Comp1;
