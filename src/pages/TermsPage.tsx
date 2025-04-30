import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FileText className="h-16 w-16 text-white/90 mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-lg text-blue-100">
            Última actualización: 25 de abril de 2024
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="prose prose-blue max-w-none">
            <div className="space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introducción</h2>
                <p className="text-gray-600 leading-relaxed">
                  Estos Términos y Condiciones rigen el uso de ServiHogar, una plataforma que
                  conecta trabajadores independientes con usuarios que requieren servicios
                  para el hogar. Al acceder o utilizar nuestra plataforma, aceptas estos
                  términos en su totalidad.
                </p>
              </section>

              {/* Definitions */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Definiciones</h2>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Plataforma</h3>
                    <p className="text-gray-600">Se refiere al sitio web y servicios de ServiHogar.</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Usuario</h3>
                    <p className="text-gray-600">Cualquier persona que acceda o utilice la plataforma.</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Trabajador</h3>
                    <p className="text-gray-600">Profesional independiente que ofrece servicios a través de la plataforma.</p>
                  </div>
                </div>
              </section>

              {/* Registration */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Registro y Cuentas</h2>
                <p className="text-gray-600 mb-4">Para utilizar nuestros servicios como trabajador, debes:</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span>Ser mayor de 18 años</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span>Proporcionar información precisa y verdadera</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span>Mantener tu información actualizada</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span>Proteger la confidencialidad de tu cuenta</span>
                  </li>
                </ul>
              </section>

              {/* Services */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Servicios</h2>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
                  <p className="text-blue-900">
                    ServiHogar actúa como intermediario entre trabajadores y usuarios. No somos
                    empleadores de los trabajadores ni prestadores directos de los servicios
                    ofrecidos.
                  </p>
                </div>
              </section>

              {/* Responsibilities */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Responsabilidades</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">De los Trabajadores</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <span>Prestar servicios de manera profesional y responsable</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <span>Mantener actualizada la información de su perfil</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <span>Cumplir con las citas y compromisos acordados</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <span>Mantener comunicación respetuosa con los usuarios</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">De ServiHogar</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <span>Mantener la plataforma funcional y accesible</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <span>Verificar la identidad de los trabajadores</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <span>Proteger la información personal de usuarios y trabajadores</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <span>Mediar en caso de disputas</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Other Sections */}
              <section className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Pagos y Comisiones</h2>
                  <p className="text-gray-600">
                    Los trabajadores son libres de establecer sus tarifas. ServiHogar no
                    interviene en las transacciones monetarias entre trabajadores y usuarios.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Privacidad y Datos Personales</h2>
                  <p className="text-gray-600">
                    La recolección y uso de datos personales se rige por nuestra Política de
                    Privacidad. Al usar la plataforma, aceptas nuestras prácticas de
                    privacidad.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Propiedad Intelectual</h2>
                  <p className="text-gray-600">
                    Todo el contenido de la plataforma es propiedad de ServiHogar o se usa
                    con autorización. No está permitido copiar o distribuir sin autorización.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Modificaciones</h2>
                  <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6">
                    <p className="text-yellow-900">
                      ServiHogar se reserva el derecho de modificar estos términos en cualquier
                      momento. Los cambios serán efectivos al publicarse en la plataforma.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Terminación</h2>
                  <p className="text-gray-600">
                    Podemos suspender o terminar cuentas que violen estos términos o por
                    cualquier otra razón a nuestra discreción.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Ley Aplicable</h2>
                  <p className="text-gray-600">
                    Estos términos se rigen por las leyes de Colombia. Cualquier disputa se
                    resolverá en los tribunales de Medellín.
                  </p>
                </div>
              </section>

              {/* Contact Section */}
              <section className="mt-12 border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contacto</h2>
                <p className="text-gray-600">
                  Para preguntas sobre estos términos, contáctanos en{' '}
                  <a
                    href="mailto:legal@servihogar.co"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    legal@servihogar.co
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}