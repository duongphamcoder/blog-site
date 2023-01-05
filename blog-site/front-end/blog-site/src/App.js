import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from './app/components/login/Login';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
