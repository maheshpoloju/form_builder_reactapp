import { Route, Routes } from "react-router-dom";
import "./App.css";
import FormCreate from "./components/FormCreate";
import FormEdit from "./components/FormEdit";
import Home from "./components/Home";

function App() {
  return (
    <div className="main-container">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/form/create" element={<FormCreate />} />
        <Route exact path="/form/edit/:id" element={<FormEdit />} />
      </Routes>
    </div>
  );
}

export default App;
