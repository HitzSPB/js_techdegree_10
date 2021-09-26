import logo from './logo.svg';
import './App.css';
import './styles/reset.css';
import './styles/global.css';
import Courses from './components/courses';

function App() {
  // fetch('http://localhost:5000/api/courses').then(res => res.json()).then((data) => {console.log(data)});
  return (
    <Courses />
  );
}

export default App;
