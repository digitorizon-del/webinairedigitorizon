import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Success from './pages/Success'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/succes" element={<Success />} />
    </Routes>
  )
}
