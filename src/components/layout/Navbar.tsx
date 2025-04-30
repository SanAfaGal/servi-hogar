import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Search, LogIn, UserPlus, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              to="/"
              className="flex items-center px-2 text-xl font-semibold text-blue-600"
            >
              ServiHogar
            </Link>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <Link
                to="/"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                <Home className="h-4 w-4 mr-2" />
                Inicio
              </Link>
              <Link
                to="/buscar"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                <Search className="h-4 w-4 mr-2" />
                Buscar Servicios
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/perfil"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  <User className="h-4 w-4 mr-2" />
                  Mi Perfil
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </Link>
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}