import React, { useEffect } from 'react'

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import MessagingPage from './pages/MessagingPage'
import OnboardingPage from './pages/OnboardingPage'
import ProfilePage from './pages/ProfilePage'
import SearchPage from './pages/SearchPage'
import {
  Route,
  HashRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom'

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col selection:bg-primary/20 selection:text-primary">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/messaging" element={<MessagingPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
