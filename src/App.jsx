import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Detail from './components/Detail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/breweries/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
