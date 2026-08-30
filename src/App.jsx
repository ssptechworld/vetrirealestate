import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';

import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Modal from './components/Modal';

import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import About from './pages/About';
import Agents from './pages/Agents';
import Contact from './pages/Contact';

export default function App() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [modalPropertyTitle, setModalPropertyTitle] = useState('');

  const handleOpenInquiryModal = (propertyTitle = '') => {
    setModalPropertyTitle(propertyTitle);
    setInquiryModalOpen(true);
  };

  const handleCloseInquiryModal = () => {
    setInquiryModalOpen(false);
    setModalPropertyTitle('');
  };

  return (
    <FavoritesProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#121417]">
          
          <Navbar onOpenInquiryModal={() => handleOpenInquiryModal()} />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home onOpenInquiryModal={handleOpenInquiryModal} />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<PropertyDetails onOpenInquiryModal={handleOpenInquiryModal} />} />
              <Route path="/about" element={<About />} />
              <Route path="/agents" element={<Agents onOpenInquiryModal={handleOpenInquiryModal} />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          <Footer />

          {/* Global Schedule / Inquiry Modal */}
          <Modal
            isOpen={inquiryModalOpen}
            onClose={handleCloseInquiryModal}
            defaultPropertyTitle={modalPropertyTitle}
          />

        </div>
      </Router>
    </FavoritesProvider>
  );
}
