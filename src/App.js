import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';


function App() {
  const closeCities = useSelector(store => store.locations);
  const [position, setPosition] = useState({});
  const [city, setCity] = useState({});
  const [reverseLocation, setReverseLocation] = useState({});
  const [gotReverse, setGotReverse] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();


  const getPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject) 
    });
  }

  const getLocation = async () => {
    await getPosition()
    .then(response => {
      const coordinates = {lat: response.coords.latitude, lng: response.coords.longitude};
      // dispatch to server to find closest cities with given set of coords.
      dispatch({
        type: 'GET_CLOSEST',
        payload: {
          lat: coordinates.lat,
          lng: coordinates.lng,
        }
      });
      // console.log(coordinates);
      setPosition(coordinates);
      
      axios.get(`https://nominatim.openstreetmap.org/reverse?&lat=${coordinates.lat}&lon=${coordinates.lng}&format=json`)
      .then(response => {
        console.log(response);
        setCity({city: response.data.address.city, state: response.data.address.state});
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

  const getReverseLocation = () => {
    if(gotReverse) {
      setGotReverse(false);
    } else {
      axios.get(`https://nominatim.openstreetmap.org/search?q=${city.city},${city.state}&format=json`)
      // axios.get(`https://nominatim.openstreetmap.org/search?q=${city.city},ND&format=json`)
      .then(response => {
        console.log(response);
        setReverseLocation({lat: response.data[0].lat, lng: response.data[0].lon});
        setGotReverse(!gotReverse);
      })
      .catch(err => {
        console.log(err);
      });
    }
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
          <li>Location: {JSON.stringify(city)}</li>
        </ul>
        <button onClick={() => getReverseLocation()}>Reverse Locataion</button>
        {gotReverse &&
          <ul>
            <li>{JSON.stringify(reverseLocation)}</li>
          </ul>
        }
        <p>Closest Cities:</p>
        <ul>
          {closeCities.map(c => (
            <li key={c.id}>{c.city}, {c.state_code}</li>
          ))}
        </ul>
      </div>
    );
  }

  
}

export default App;
