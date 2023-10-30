//DEPENDENCIES
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//PAGES
import Home from "./Pages/Home";

//COMPONENTS
import Navbar from "./Components/Navbar";

//STYLE
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
