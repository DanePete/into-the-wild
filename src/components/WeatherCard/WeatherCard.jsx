
import React from 'react';

const WeatherCard = ({dt, temp_min, temp_max, main, icon}) => {
  // create a date object with Date class constructor
  const date = new Date(dt);
  return (
    // <Card style={{width: '18rem'}}>
    //   <Card.Img
    //     variant="top"
    //     // get the src from example url and pass the icon prop for icon code
    //     src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
    //   />
    //   <Card.Body>
    //     <Card.Title>{main}</Card.Title>
    //     {/*  datetime is received in milliseconds, let's turn into local date time */}
    //     <p>
    //       {date.toLocaleDateString()} - {date.toLocaleTimeString()}
    //     </p>
    //     {/* minimum temperature */}
    //     <p>Min: {temp_min}</p>
    //     {/* maximum temperature */}
    //     <p>Max: {temp_max}</p>
    //   </Card.Body>
    // </Card>

    <div className="card weather-card h-100 border-0 shadow card">
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
      <div className="card-body">
        <div className="card-title">{main}</div>
        <p>
             {date.toLocaleDateString()} - {date.toLocaleTimeString()}
        </p>
        {/* minimum temperature */}
        <p>Min: {temp_min}</p>
        {/* maximum temperature */}
        <p>Max: {temp_max}</p>
      </div>
    </div>

  );
};

export default WeatherCard;