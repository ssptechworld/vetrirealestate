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
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';

import AdminProjectList from './pages/admin/AdminProjectList';
import AdminProjectForm from './pages/admin/AdminProjectForm';
import AdminGallery from './pages/admin/AdminGallery';

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
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Admin Routes */}
              <Route path="/admin/projects" element={<AdminProjectList />} />
              <Route path="/admin/projects/add" element={<AdminProjectForm isEdit={false} />} />
              <Route path="/admin/projects/edit/:id" element={<AdminProjectForm isEdit={true} />} />
              <Route path="/admin/gallery" element={<AdminGallery />} />
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
