import './App.css'
import Login from './Pages/Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Registrar from "./Pages/Registrar"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/registrar" element={<Registrar />} />
            </Routes>
        </Router>
    );
}

export default App;
