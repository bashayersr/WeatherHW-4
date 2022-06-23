import { useEffect, useState } from 'react';

const App = () => {
  const [counteryName, setCountryName] = useState('');
  const [searchedCountry, setSearchedCountry] = useState('');
  const [temperatureCount, setTemperatureCount] = useState(0);
  const [setForecastCount ] = useState('');

  useEffect(() => {
    const getDataFromApi = async () => {
      const request = await fetch('https://goweather.herokuapp.com/weather');
      const info = await request.json();
      setTemperatureCount(info.temperature);
      setForecastCount(info.forecast);
    };
    getDataFromApi();
  }, []);

  const onClick = async (e) => {
    const request = await fetch(
      'https://goweather.herokuapp.com/weather/' + counteryName
    );
    const info = await request.json();

    if (request.status !== 200) {
      alert(info.error.message);
      return;
    }


    setSearchedCountry(counteryName);
    setTemperatureCount(info.temperature);
    setForecastCount(info.forecast.value);
    setCountryName('');
  };

  return (
    <div className='container'>
        <>
          <h1 className='text-left'>Weather system</h1>
          <div className='input-group  mt-5'>
            <input 
              type='text'
              value={counteryName}
              onChange={(e) => setCountryName(e.target.value)}
              className='card form-control'
              placeholder=' city name '
            />
            
            <button onClick={onClick} className="form" type="button" id="basic-addon2" style={{ color: 'darkgrey' }}>Search</button>

            <h3 className='text-left mt-4 w-100'>
             Weather in  {' '} <span style={{ color: 'black' }}>{searchedCountry}</span>: </h3>
            <div className='info mt-5'>
              <div className='flex'>
                <h3 className="card-Temperature">Temperature</h3>
                <h3 className="text-center">{temperatureCount}</h3>
              </div>
              </div>
          </div>
        </>
    </div>
  );
};

export default App;