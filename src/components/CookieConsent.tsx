import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Cookie className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
            <div className="text-sm text-gray-600">
              <p>
                Utilizamos cookies para mejorar tu experiencia en nuestro sitio web.
                Al continuar navegando, aceptas nuestra{' '}
                <Link to="/cookies" className="text-blue-600 hover:underline">
                  política de cookies
                </Link>
                .
              </p>
            </div>
          </div>
          <button
            onClick={handleAccept}
            className="flex-shrink-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}