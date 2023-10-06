import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {
  
  useEffect(() => {
    if (typeof window !== 'undefined') {

      // Don't register the service worker
      // until the page has fully loaded
      window.addEventListener('load', () => {
        // Is service worker available?
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js').then(() => {
            console.log('Service worker registered!');
          }).catch((error) => {
            console.warn('Error registering service worker:');
            console.warn(error);
          });
        }
      });
      
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div style={{ marginTop: '20px' }}/>
        <img src="https://cdn.glitch.com/32cd740a-9733-4e5d-b961-b3aed2769895%2Fpossum2.jpg" alt="" />
      </header>
    </div>
  );
}

export default App;
