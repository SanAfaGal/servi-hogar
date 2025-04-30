import React from 'react';
import { Link } from 'react-router-dom';
import { Search, UserPlus, Shield, Clock, Star, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Servicios confiables para tu hogar
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Conectamos hogares con los mejores trabajadores independientes. Encuentra profesionales
              verificados para cualquier servicio que necesites.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/buscar"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                <Search className="h-5 w-5 mr-2" />
                Buscar Servicios
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-400 transition-colors"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Registrarse como Trabajador
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir ServiHogar?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos una plataforma segura y confiable para conectar hogares con trabajadores
              calificados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trabajadores Verificados</h3>
              <p className="text-gray-600">
                Todos nuestros trabajadores pasan por un proceso de verificación para garantizar su
                profesionalismo.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Respuesta Rápida</h3>
              <p className="text-gray-600">
                Encuentra el profesional que necesitas en minutos y agenda el servicio cuando lo
                necesites.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Calidad Garantizada</h3>
              <p className="text-gray-600">
                Sistema de valoraciones y reseñas para asegurar la mejor experiencia de servicio.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 md:p-12 text-center">
              <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-8">
                <Users className="h-10 w-10" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                ¿Eres un profesional independiente?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Únete a nuestra comunidad de trabajadores y comienza a ofrecer tus servicios a miles de
                hogares.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Comenzar Ahora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}