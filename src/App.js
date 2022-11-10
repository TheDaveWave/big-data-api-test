import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [position, setPosition] = useState({});
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);


  const getPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject) 
    });
  }

  // milk users to put info into DB like city and lng, lat.

  const getLocation = async () => {
    await getPosition()
    .then(response => {
      const coordinates = {lat: response.coords.latitude, lng: response.coords.longitude};
      console.log(coordinates);
      setPosition(coordinates);

      axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.lat}&longitude=${position.lng}&localityLanguage=en`)
      .then(response => {
        console.log(response);
        setCity(response.data.city);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(loading) {
    return(
      <h1>Loading...</h1>
    );
  } else {
    return (
      <div className="App">
        <h1>Location Bro!</h1>
        <ul>
          <li>{JSON.stringify(position)}</li>
          <li>{city}</li>
        </ul>
      </div>
    );
  }

  
}

export default App;
