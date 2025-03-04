import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"; // Página inicial
import Login from "./Pages/Login";
import Registrar from "./Pages/Registrar";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/registrar" element={<Registrar />} />
            </Routes>
        </Router>
    );
}

export default App;

