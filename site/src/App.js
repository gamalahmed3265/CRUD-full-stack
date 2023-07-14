import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Books from './pages/Books';
import Update from './pages/Update';
import Add from './pages/Add';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books/>}/>
          <Route path="/update" element={<Update/>}/>
          <Route path="/add" element={<Add/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
