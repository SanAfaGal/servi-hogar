import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import WorkerRegistrationForm from './components/WorkerRegistrationForm';
import EmailLogin from './components/EmailLogin';
import WorkerProfile from './components/worker/WorkerProfile';
import WorkerDetailPage from './pages/WorkerDetailPage';
import AuthCallback from './components/auth/AuthCallback';
import PrivateRoute from './utils/PrivateRoute';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import CookiesPage from './pages/CookiesPage';
import CookieConsent from './components/CookieConsent';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/buscar" element={<HomePage />} />
            <Route path="/login" element={<EmailLogin />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/registro" element={<WorkerRegistrationForm onRegistrationComplete={() => {}} />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/sobre-nosotros" element={<AboutPage />} />
            <Route path="/preguntas-frecuentes" element={<FAQPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/terminos" element={<TermsPage />} />
            <Route path="/privacidad" element={<PrivacyPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/trabajador/:id" element={<WorkerDetailPage />} />
            <Route
              path="/perfil"
              element={
                <PrivateRoute>
                  <WorkerProfile />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
        <CookieConsent />
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#fff',
              color: '#363636',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              borderRadius: '0.5rem',
              padding: '1rem',
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}