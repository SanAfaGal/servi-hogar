import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">ServiHogar</h3>
            <p className="text-sm">
              Conectando hogares con los mejores trabajadores independientes desde 2024.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/buscar" className="hover:text-white">
                  Buscar Servicios
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white">
                  Registrarse como Trabajador
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="hover:text-white">
                  Servicios Disponibles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Información</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/sobre-nosotros" className="hover:text-white">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/preguntas-frecuentes" className="hover:text-white">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terminos" className="hover:text-white">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/privacidad" className="hover:text-white">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-white">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} ServiHogar. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}