import { Route, Routes } from "react-router-dom";
import "./App.css";
import FormCreate from "./components/FormCreate";
import Home from "./components/Home";

function App() {
  return (
    <div className="main-container">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/form/create" element={<FormCreate />} />
      </Routes>
    </div>
  );
}

export default App;
