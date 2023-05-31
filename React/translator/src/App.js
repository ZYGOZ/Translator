import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Translator from "./Components/Translator"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Translator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;