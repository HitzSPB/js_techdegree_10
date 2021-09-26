import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import './styles/reset.css';
import './styles/global.css';
import Header from './components/header';
import Courses from './components/courses';

function App() {
  // fetch('http://localhost:5000/api/courses').then(res => res.json()).then((data) => {console.log(data)});
  return (
    <BrowserRouter>
      <Header />
      <Courses />
    </BrowserRouter>
  );
}

export default App;
