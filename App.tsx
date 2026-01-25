
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import ChatBot from './components/ChatBot';

// Pages
import Home from './pages/Home';
import Stays from './pages/Stays';
import ResortDetail from './pages/ResortDetail';
// Fix: Already included file name 'file:///pages/Offers.tsx' differs from file name 'file:///pages/offers.tsx' only in casing.
import Offers from './pages/offers';
// Fix: Already included file name 'file:///pages/Experiences.tsx' differs from file name 'file:///pages/experiences.tsx' only in casing.
import Experiences from './pages/experiences';
import Stories from './pages/Stories';
import BlogPostDetail from './pages/BlogPostDetail';
import PlanMyTrip from './pages/PlanMyTrip';
import AdminSync from './pages/AdminSync';

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
        <Route path="/stays" element={<Stays />} />
        <Route path="/stays/:slug" element={<ResortDetail />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:slug" element={<BlogPostDetail />} />
        <Route path="/plan" element={<PlanMyTrip />} />
        <Route path="/admin/sync" element={<AdminSync />} />
      </Routes>
      <ChatBot />
      <ScrollToTopButton />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
