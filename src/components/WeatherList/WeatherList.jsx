import React from 'react'
import WeatherCard from '../WeatherCard/WeatherCard';

const WeatherList = ({weathers}) => {
    console.log('weathers', weathers);
    return (
        <div className="row">
           {weathers?.map(({dt, main, weather}) => (
                <div className="mb-5 hover-animate col-sm-2 col-xl-2" key={dt}>
                  <WeatherCard 
                    temp_max={main.temp_max} 
                    temp_min={main.temp_min} 
                    dt={dt * 1000} 
                    main={weather[0].main} 
                    icon={weather[0].icon} 
                  />
                </div>
            ))} 
        </div>
    )
}

export default WeatherList;