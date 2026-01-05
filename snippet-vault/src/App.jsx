import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddSnippet from './pages/AddSnippet';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
    <Toaster position='top-center' toastOptions={{duration:1500}} />
      <Routes>
        {/* When path is "/" -> Show Home Grid */}
        <Route path="/" element={<Home />} />
        
        {/* When path is "/add" -> Show Add Form */}
        <Route path="/add" element={<AddSnippet />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;