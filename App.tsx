import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import ChatBot from './components/ChatBot';
import DarkModeToggle from './components/DarkModeToggle';

// Pages
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import Stays from './pages/Stays';
import ResortDetail from './pages/ResortDetail';
// Fixed: Using PascalCase for consistency and to resolve casing collisions between Offers.tsx and offers.tsx
import Offers from './pages/Offers';
// Fixed: Using PascalCase for consistency and to resolve casing collisions between Experiences.tsx and experiences.tsx
import Experiences from './pages/Experiences';
import Stories from './pages/Stories';
import BlogPostDetail from './pages/BlogPostDetail';
import PlanMyTrip from './pages/PlanMyTrip';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import AdminSync from './pages/AdminSync';
import AdminStories from './pages/AdminStories';

const ScrollToTopOnRoute = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTopOnRoute />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/stays" element={<Stays />} />
        <Route path="/stays/:slug" element={<ResortDetail />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:slug" element={<BlogPostDetail />} />
        <Route path="/plan" element={<PlanMyTrip />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/admin/sync" element={<AdminSync />} />
        <Route path="/admin/stories" element={<AdminStories />} />
      </Routes>
      <ChatBot />
      <ScrollToTopButton />
      <DarkModeToggle />
      <Footer />
    </BrowserRouter>
  );
};

export default App;