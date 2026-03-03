import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LegalPage from './pages/LegalPage'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
        <Route path="/terms-of-service" element={<LegalPage type="terms" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
