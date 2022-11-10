import './App.css';


function App() {

  const getPosition = () => {
    return new Promise((resolve, reject) => 
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
  }

  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
