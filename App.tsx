import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Stays from './pages/Stays';
import ResortDetail from './pages/ResortDetail';
import Offers from './pages/Offers';
import Experiences from './pages/Experiences';
import Stories from './pages/Stories';
import BlogPostDetail from './pages/BlogPostDetail';
import PlanMyTrip from './pages/PlanMyTrip';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resorts" element={<Stays />} />
            <Route path="/resorts/:slug" element={<ResortDetail />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/stories/:slug" element={<BlogPostDetail />} />
            <Route path="/plan" element={<PlanMyTrip />} />
            
            {/* Redirects for legacy/alternate paths */}
            <Route path="/stays" element={<Navigate to="/resorts" replace />} />
            <Route path="/stays/:slug" element={<Navigate to="/resorts/:slug" replace />} />
            
            {/* Catch-all route for frontend 404s */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;