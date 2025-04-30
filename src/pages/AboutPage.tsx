import React from 'react';
import { Shield, Users, Star, Target, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sobre ServiHogar
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Conectando hogares con profesionales confiables desde 2024
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Nuestra Misión
            </h2>
            <p className="text-gray-600 leading-relaxed">
              En ServiHogar, nos dedicamos a facilitar la conexión entre hogares y
              profesionales calificados, creando oportunidades de trabajo digno y
              garantizando servicios de calidad para las familias colombianas.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Nuestra Visión
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Aspiramos a ser la plataforma líder en Colombia para la contratación de
              servicios domésticos, reconocida por nuestra excelencia, confiabilidad
              y compromiso con el desarrollo profesional de nuestros trabajadores.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Nuestros Valores
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                Confiabilidad
              </h3>
              <p className="text-gray-600 text-center">
                Verificamos a todos nuestros profesionales para garantizar servicios seguros.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                Comunidad
              </h3>
              <p className="text-gray-600 text-center">
                Construimos una red sólida de profesionales y usuarios satisfechos.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                Calidad
              </h3>
              <p className="text-gray-600 text-center">
                Mantenemos altos estándares de servicio y atención al cliente.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                Innovación
              </h3>
              <p className="text-gray-600 text-center">
                Mejoramos constantemente nuestra plataforma para una mejor experiencia.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            ¿Por qué elegirnos?
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-8">
          {[
            {
              title: "Verificación Rigurosa",
              description: "Todos nuestros profesionales pasan por un proceso de verificación exhaustivo."
            },
            {
              title: "Soporte 24/7",
              description: "Estamos disponibles para ayudarte en cualquier momento que lo necesites."
            },
            {
              title: "Garantía de Satisfacción",
              description: "Tu satisfacción es nuestra prioridad. Trabajamos para garantizar la mejor experiencia."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow flex items-start gap-4">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Listo para empezar?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Únete a nuestra comunidad de profesionales y comienza a ofrecer tus servicios
            </p>
            <a
              href="/login"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
            >
              Empezar Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}