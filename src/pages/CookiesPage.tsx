import React from 'react';
import { Cookie, Settings, Clock, Shield, Bell } from 'lucide-react';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Cookie className="h-16 w-16 text-white/90 mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Política de Cookies
          </h1>
          <p className="text-lg text-blue-100">
            Última actualización: 25 de abril de 2024
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="space-y-12">
            {/* What are Cookies */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Cookie className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  ¿Qué son las Cookies?
                </h2>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-blue-900">
                  Las cookies son pequeños archivos de texto que se almacenan en tu
                  dispositivo cuando visitas nuestro sitio web. Nos ayudan a proporcionar
                  funcionalidades esenciales y mejorar tu experiencia.
                </p>
              </div>
            </section>

            {/* Types of Cookies */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Settings className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Tipos de Cookies que Utilizamos
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Cookies Esenciales
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Necesarias para el funcionamiento básico del sitio:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span>Mantener tu sesión iniciada</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span>Recordar tus preferencias</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span>Garantizar la seguridad del sitio</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Cookies de Rendimiento
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Nos ayudan a entender cómo utilizas el sitio:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span>Estadísticas de uso</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span>Páginas más visitadas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span>Errores encontrados</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Cookies de Funcionalidad
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Mejoran tu experiencia:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span>Recordar tu ubicación</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span>Personalizar el contenido</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span>Guardar preferencias de idioma</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Cookies de Terceros
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Algunos servicios externos pueden establecer sus propias cookies:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span>Análisis web (Google Analytics)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span>Redes sociales</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span>Servicios de mapas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookie Control */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Settings className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Control de Cookies
                </h2>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 mb-4">
                  Puedes controlar las cookies a través de:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <p className="font-medium text-gray-900 mb-2">Configuración del Navegador</p>
                    <p className="text-sm text-gray-600">
                      Ajusta las preferencias de cookies en tu navegador web
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <p className="font-medium text-gray-900 mb-2">Banner de Consentimiento</p>
                    <p className="text-sm text-gray-600">
                      Usa nuestro banner para gestionar tus preferencias
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <p className="font-medium text-gray-900 mb-2">Herramientas de Privacidad</p>
                    <p className="text-sm text-gray-600">
                      Utiliza herramientas de gestión de privacidad
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookie Duration */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Clock className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Duración de las Cookies
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-3">Cookies Temporales</h3>
                  <p className="text-gray-600">
                    Se eliminan automáticamente al cerrar el navegador
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-3">Cookies Persistentes</h3>
                  <p className="text-gray-600">
                    Permanecen en tu dispositivo por un tiempo determinado
                  </p>
                </div>
              </div>
            </section>

            {/* Impact of Disabling Cookies */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Impacto de Desactivar Cookies
                </h2>
              </div>
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6">
                <p className="text-yellow-900 mb-4">Si desactivas las cookies:</p>
                <ul className="space-y-2 text-yellow-800">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                    <span>Algunas funciones pueden no estar disponibles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                    <span>Tu experiencia puede verse limitada</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                    <span>Ciertas características pueden no funcionar correctamente</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Updates */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Bell className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Actualizaciones de la Política
                </h2>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-blue-900">
                  Podemos actualizar esta política periódicamente. Los cambios entrarán en
                  vigor inmediatamente después de su publicación.
                </p>
              </div>
            </section>

            {/* Contact Section */}
            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contacto</h2>
              <p className="text-gray-600">
                Para preguntas sobre nuestra política de cookies, contáctanos en{' '}
                <a
                  href="mailto:privacidad@servihogar.co"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  privacidad@servihogar.co
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}