import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import UserContext from "./UserContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(UserContext);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
