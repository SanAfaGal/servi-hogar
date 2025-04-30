import React from 'react';
import { Lock, Shield, UserCheck, Database, Bell } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Lock className="h-16 w-16 text-white/90 mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Política de Privacidad
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
            {/* Information Collection */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Database className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Información que Recolectamos
                </h2>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 mb-4">Recolectamos la siguiente información personal:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span>Nombre completo</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span>Documento de identidad</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span>Correo electrónico</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span>Número de teléfono</span>
                    </li>
                  </ul>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span>Dirección</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span>Información profesional</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span>Fotografías de perfil</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span>Certificaciones profesionales</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Information Usage */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <UserCheck className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Uso de la Información
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-medium text-blue-900 mb-4">Propósitos Principales</h3>
                  <ul className="space-y-3 text-blue-800">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2" />
                      <span>Verificar la identidad de los trabajadores</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2" />
                      <span>Facilitar la conexión entre trabajadores y usuarios</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2" />
                      <span>Mejorar nuestros servicios</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-medium text-blue-900 mb-4">Propósitos Secundarios</h3>
                  <ul className="space-y-3 text-blue-800">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2" />
                      <span>Enviar comunicaciones relevantes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2" />
                      <span>Cumplir con obligaciones legales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2" />
                      <span>Análisis y mejora de la plataforma</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Protection */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Protección de Datos
                </h2>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 mb-4">
                  Implementamos medidas de seguridad técnicas y organizativas para proteger
                  tu información personal, incluyendo:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span>Encriptación de datos sensibles</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span>Acceso restringido a información personal</span>
                    </li>
                  </ul>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span>Monitoreo regular de seguridad</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span>Copias de seguridad periódicas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* User Rights */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <UserCheck className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Derechos del Usuario
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Acceso y Control",
                    rights: [
                      "Acceder a tu información personal",
                      "Corregir información inexacta",
                      "Solicitar la eliminación de tus datos"
                    ]
                  },
                  {
                    title: "Preferencias y Consentimiento",
                    rights: [
                      "Oponerte al procesamiento de tus datos",
                      "Retirar tu consentimiento en cualquier momento",
                      "Actualizar tus preferencias de comunicación"
                    ]
                  }
                ].map((section, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-medium text-gray-900 mb-4">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.rights.map((right, rightIndex) => (
                        <li key={rightIndex} className="flex items-center gap-2 text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                          <span>{right}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Data Retention */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Database className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Retención de Datos
                </h2>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-blue-900 mb-4">
                  Mantenemos tu información personal mientras:
                </p>
                <ul className="space-y-3 text-blue-800">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    <span>Tu cuenta esté activa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    <span>Sea necesario para proporcionar nuestros servicios</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    <span>Lo requiera la ley</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Notifications */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Bell className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Cambios en la Política
                </h2>
              </div>
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6">
                <p className="text-yellow-900">
                  Podemos actualizar esta política ocasionalmente. Te notificaremos sobre
                  cambios significativos a través de la plataforma o por correo
                  electrónico.
                </p>
              </div>
            </section>

            {/* Contact Section */}
            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contacto</h2>
              <p className="text-gray-600">
                Para preguntas sobre esta política o tus datos personales, contáctanos en{' '}
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