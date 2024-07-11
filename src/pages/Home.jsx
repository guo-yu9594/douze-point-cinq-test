import '../App.css';
import AuthServices from '../services/AuthServices'

function Home() {
  const handleClick = () => {
    const url = AuthServices.getOAuthURL();
    window.location.href = url;
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleClick}>Click here</button>
      </header>
    </div>
  );
}

export default Home;