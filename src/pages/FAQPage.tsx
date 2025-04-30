import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      question: '¿Cómo funciona ServiHogar?',
      answer: 'ServiHogar es una plataforma que conecta a profesionales independientes con personas que necesitan servicios para el hogar. Los usuarios pueden buscar trabajadores según el tipo de servicio y ubicación, ver perfiles, calificaciones y contactarlos directamente.',
    },
    {
      question: '¿Cómo me registro como trabajador?',
      answer: 'Para registrarte como trabajador, haz clic en "Registrarse" en la barra de navegación. Deberás proporcionar tu información personal, documentos de identificación, experiencia laboral y los servicios que ofreces.',
    },
    {
      question: '¿Qué documentos necesito para registrarme?',
      answer: 'Necesitarás un documento de identificación válido (cédula de ciudadanía, cédula de extranjería o pasaporte), comprobante de domicilio y certificaciones profesionales si las tienes.',
    },
    {
      question: '¿Cómo se garantiza la seguridad?',
      answer: 'Verificamos la identidad de todos los trabajadores registrados y mantenemos un sistema de calificaciones y reseñas. Además, implementamos políticas estrictas de privacidad y seguridad de datos.',
    },
    {
      question: '¿Cuál es el costo del servicio?',
      answer: 'El registro en la plataforma es gratuito para los trabajadores. Las tarifas por servicios son establecidas directamente por cada profesional.',
    },
    {
      question: '¿Cómo actualizo mi perfil?',
      answer: 'Una vez iniciada la sesión, puedes acceder a "Mi Perfil" donde encontrarás opciones para actualizar tu información personal, servicios, fotografías y certificaciones.',
    },
    {
      question: '¿En qué ciudades está disponible ServiHogar?',
      answer: 'Actualmente operamos en el Área Metropolitana del Valle de Aburrá: Medellín, Bello, Itagüí, Envigado, Sabaneta, La Estrella, Copacabana, Girardota, Barbosa y Caldas.',
    },
    {
      question: '¿Cómo manejo mi disponibilidad?',
      answer: 'En tu perfil puedes activar o desactivar tu disponibilidad y establecer horarios específicos para la prestación de servicios.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Preguntas Frecuentes
        </h1>
        <p className="text-lg text-gray-600">
          Encuentra respuestas a las preguntas más comunes sobre ServiHogar
        </p>
      </div>

      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-3">
              <HelpCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}