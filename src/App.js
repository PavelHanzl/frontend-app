import logo from './images/logo-white.png';
import './App.css';
import DataList from './DataList'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

      </header>
      <main class = "container">
        <DataList />
      </main>
    </div>
  );
}

export default App;
