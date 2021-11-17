import { Route, Routes } from "react-router-dom";
import Home from './pages/Home/index';
import Header from './components/Header/index'


function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}


export default App;
